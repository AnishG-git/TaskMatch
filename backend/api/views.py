from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Customer, Contractor, ToDoList, Task
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer, ContractorSerializer
from .helpers import get_distance, validate_zip
import heapq




# Tanvi Deshpande - Registration
@api_view(['POST'])
def register(request):
    # Extract data from the request body
    data = request.data
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')
    name = data.get('name')
    zip = data.get('zip_code')
    company_name = data.get('company_name')
    category = data.get('category')

    # Check for valid zip code (see helpers.py)
    if not validate_zip(zip):
        return Response({"status": "Invalid zip code"}, status=status.HTTP_400_BAD_REQUEST)
    
    # If company name and category are provided, create a Contractor
    if (company_name and category):
        # Check if Contractor with provided email or phone number already exists
        if Contractor.objects.filter(email=email).exists():
            return Response({"status": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        
        if Contractor.objects.filter(phone_number=phone_number).exists():
            return Response({"status": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
        
        # Create a new Contractor
        try:
            Contractor.objects.create_user(
                username=email,
                email=email, 
                password=password, 
                phone_number=phone_number,
                zip_code=zip,
                company_name=company_name,
                category=category
            )
            return Response({"status": "Contractor created successfully!"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            # Handle exceptions if any while creating a new Contractor
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    else:
        # Check if Customer with provided email or phone number already exists
        if Customer.objects.filter(email=email).exists():
            return Response({"status": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        
        if Customer.objects.filter(phone_number=phone_number).exists():
            return Response({"status": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
        
        # Create a new Customer
        try:
            Customer.objects.create_user(
                username=email,
                email=email, 
                name=name,
                password=password, 
                phone_number=phone_number,
                zip_code=zip
            )
            # Create a ToDoList for the new Customer (will only get here if email is unique)
            ToDoList.objects.create(user=Customer.objects.get(email=email))
            return Response({"status": "Customer created successfully!"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            # Handle exceptions if any while creating a new Customer
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# Kris Arbasto - Login        
@api_view(['POST'])
def login(request):
    # uses get functions to get user input (email and password) from login fields
    data = request.data
    email = data.get('email')
    password = data.get('password')
    
    # Authenticating user
    user = authenticate(username=email, password=password)
    
    # if user input matches / is valid ; login process begins
    if user is not None:
        # creates token for user
        token, created = Token.objects.get_or_create(user=user)

        print(f'User: {email} logged in\nToken: {token.key}\n')

        # returns token
        return Response({"token": token.key, "tasks": get_tasks_helper(user)}, status=status.HTTP_200_OK)
    
    else:
        # if user input does not match / invalid ; output error message
        print(f'Invalid credentials for user: {email} or user does not exist\n')
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)




# Kris Arbasto - Logout    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout(request):
    # deletes the token for the user
    request.auth.delete()
    # returns a message confirming that user has been logged out
    return Response({"status": "Logout successful!"}, status=status.HTTP_200_OK)




# Pranav Kasibhatla - Create a task
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    # Extract data from the request body
    data = request.data
    user = request.user
    name = data.get('task_name')
    description = data.get('description')
    date = data.get('date')
    category = data.get('category')

    if not name or not description or not date or not category:
        return Response({"error": "Missing one of the required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Check if user has a ToDoList
        to_do_list = ToDoList.objects.get(user=user)

        # if they do exception will not be thrown, so a task is created
        Task.objects.create(
            name=name,
            description=description,
            date=date,
            to_do_list=to_do_list,
            category=category
        )

        # Return JSON of serialized task object
        return Response(get_tasks_helper(request.user), status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"status": e}, status=status.HTTP_409_CONFLICT)




# Taha Wasiq - Delete a task 
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request):
    # Extract task id from the request body
    data = request.data
    task_id = data.get('task_id')

    try:
        # Get the task with the specified id
        task = Task.objects.get(id=task_id)

        # Delete the task
        task.delete()

        # Return JSON of serialized task object
        return Response(get_tasks_helper(request.user), status=status.HTTP_200_OK)
    
    except Task.DoesNotExist:
        # if task with specified id does not exist, exception thrown
        return Response({"status": "incorrect task id, task not found"}, status=status.HTTP_404_NOT_FOUND)




# Ahmad - Update a task
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_task(request):
    # Extract data from the request body
    # For this function, only task_id is required
    data = request.data
    task_id = data.get('task_id')
    task = Task.objects.get(id=task_id)

    # Check if task exists
    if not task:
        # Return error message if task does not exist
        return Response({"status": "Task does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    # Other fields only need to be entered if they are to be updated
    name = data.get('task_name')
    description = data.get('description')
    date = data.get('date')
    is_complete = data.get('is_complete')
    contractor_email = data.get('contractor_email')
    category = data.get('category')

    # Getting update fields that were explicitly provided in request body
    update_fields = {key: value for key, value in data.items() if key in ['name', 'description', 'date', 'is_complete', 'category']}

    # Checking if contractor email was provided
    if contractor_email:
        try:
            # checking if contractor with provided email exists
            contractor = Contractor.objects.get(email=contractor_email)

            # connect task and contractor
            task.contractor = contractor

        except Contractor.DoesNotExist:
            # only printing error message so that update will continue with other fields
            print(f'Contractor with email: {contractor_email} does not exist')
    try:
        # Contractor email is valid here, so update task contractor
        task.save()

        # Update task with the other provided fields
        Task.objects.filter(id=task_id).update(**update_fields)

        # Return success message
        
        return Response(get_tasks_helper(request.user), status=status.HTTP_200_OK)
    
    except Exception as e:
        # Return error message if any exception occurs while updating task
        return Response({"error": e}, status=status.HTTP_409_CONFLICT)


def get_tasks_helper(user):
    to_do_list = ToDoList.objects.filter(user=user)
    tasks = Task.objects.filter(to_do_list__in=to_do_list)
    serializer = TaskSerializer(tasks, many=True)
    return serializer.data

# See Pdrer - Get tasks
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    user = request.user

    # Getting user's to do list
    to_do_list = ToDoList.objects.filter(user=user)

    # Getting all tasks in user's to do list
    tasks = Task.objects.filter(to_do_list__in=to_do_list)

    # Serialize the tasks with many=true for multiple tasks (see serializers.py)
    serializer = TaskSerializer(tasks, many=True)

    # Return JSON of serialized tasks
    return Response(serializer.data, status=status.HTTP_200_OK)
    



# Anish Garikipati - Search for contractors
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_contractor(request):
    user = request.user

    try:
        # Extract category and max distance from user from query parameters in endpoint
        category = request.query_params.get('category', None)
        distance = float(request.query_params.get('distance', None))
    except ValueError:
        # Error handling if parameters are invalid/missing
        return Response({"status": "Invalid or missing parameter(s)"}, status=status.HTTP_400_BAD_REQUEST)
    
    if distance < 0:
        # Error handling if distance is negative
        return Response({"status": "Distance cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)
    
    # user's zip code
    zip_code = user.zip_code

    # Get all contractors in the specified category
    unsorted_contractors = Contractor.objects.filter(category=category)

    # Heap to store contractors sorted by distance from user
    contractors = []

    # dictionary to keep track of contractor zip codes and their distances from user
    zip2distance = {}

    for contractor in unsorted_contractors:
        # Calculating distance between user and contractor (see helpers.py)
        contractor_distance = get_distance(zip_code, contractor.zip_code)

        # If distance is specified, only add contractors within the specified distance
        if not distance or contractor_distance <= distance:
            # Push contractor to heap with distance as key (id pushed in case of tie)
            heapq.heappush(contractors, (contractor_distance, contractor.id, contractor))

            # Add contractor zip code and distance to dictionary
            zip2distance[contractor.zip_code] = contractor_distance

    # If distance is specified, get contractors in order of distance <= specified distance
    # Otherwise, get the 10 closest contractors
    if distance:
        sorted_contractors = [heapq.heappop(contractors)[2] for _ in range(len(contractors))]
    else:
        sorted_contractors = [heapq.heappop(contractors)[2] for _ in range(min(10, len(contractors)))]

    # Serialize the contractors (see serializers.py)
    serializer = ContractorSerializer(sorted_contractors, many=True)

    # Getting JSON data from serializer
    sorted_contractors = serializer.data

    # Add distance to each contractor
    for i in range(len(sorted_contractors)):
        # Adding corresponding distance to each contractor object
        contractor = sorted_contractors[i]
        contractor['distance'] = zip2distance[contractor['zip_code']]

    # Return the sorted contractors
    return Response(sorted_contractors, status=status.HTTP_200_OK)

