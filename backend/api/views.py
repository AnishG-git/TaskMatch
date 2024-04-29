from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Customer, Contractor, ToDoList, Task
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerSerializer, TaskSerializer, ContractorSerializer
from .helpers import get_distance, validate_zip
import heapq
from django.core.validators import validate_email




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
    if (company_name):
        # Check if Contractor with provided email or phone number already exists
        if Contractor.objects.filter(email=email).exists():
            return Response({"status": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        
        if Contractor.objects.filter(phone_number=phone_number).exists():
            return Response({"status": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
        
        if category == "":
            return Response({"status": "category cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
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
            return Response({"status": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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

        # check if user is a contractor
        if hasattr(user, 'contractor'):
            contractor = Contractor.objects.get(id=user.id)
            tasks = Task.objects.filter(contractor=contractor)
            serialized_tasks = TaskSerializer(tasks, many=True)
            serialized_tasks = serialized_tasks.data
            for i in range(len(serialized_tasks)):
                serialized_tasks[i]['customer_name'] = tasks[i].to_do_list.user.name
                serialized_tasks[i]['customer_email'] = tasks[i].to_do_list.user.email
                serialized_tasks[i]['customer_phone'] = tasks[i].to_do_list.user.phone_number
                serialized_tasks[i]['customer_zip'] = tasks[i].to_do_list.user.zip_code

            userInfo = {
                "id": user.id,
                "email": contractor.email,
                "phone_number": contractor.phone_number,
                "zip_code": contractor.zip_code,
                "company_name": contractor.company_name,
                "category": contractor.category,
                "rating": contractor.rating,
                "token": token.key,
                "is_contractor": "true",
                "tasks": serialized_tasks
            }
        else:
            customer = Customer.objects.get(id=user.id)
            userInfo = {
                "id": user.id,
                "email": user.email,
                "name": customer.name,
                "phone_number": user.phone_number,
                "zip_code": user.zip_code,
                "token": token.key,
                "is_contractor": "false",
                "tasks": get_tasks_helper(user)
            }   

        # returns token
        
        return Response(userInfo, status=status.HTTP_200_OK)
    
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
    contractor_email = data.get('contractor_email')

    # Print data for debugging
    for key, value in data.items():
        print(f'{key}: {value}\n')

    if not name or not description or not date or not category:
        return Response({"error": "Missing one of the required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    print("received necessary fields\n")
    try:
        # Check if user has a ToDoList
        to_do_list = ToDoList.objects.get(user=user)
        contractor = Contractor.objects.filter(email=contractor_email)
        print(f"contractor exists: {contractor.exists()}\n")
        if not contractor.exists():
            # create task without contractor
            Task.objects.create (
                name=name,
                description=description,
                date=date,
                to_do_list=to_do_list,
                category=category
            ) 
        else:
            if contractor[0].category != category:
                return Response({"error": f'Contractor category ({contractor[0].category}) does not match task category ({category})'}, status=status.HTTP_400_BAD_REQUEST)
            # create task with contractor
            Task.objects.create (
                name=name,
                description=description,
                date=date,
                to_do_list=to_do_list,
                category=category,
                contractor=contractor[0]
            )
        print("task created\n")
        print("going to get tasks\n")
        # Return JSON of serialized task object
        
        return Response(get_tasks_helper(request.user), status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_409_CONFLICT)


def get_tasks_helper(user):
    print("getting tasks\n")
    try:
        to_do_list = ToDoList.objects.filter(user=user)
        tasks = Task.objects.filter(to_do_list__in=to_do_list)
        serializer = TaskSerializer(tasks, many=True)
        tasks_with_distances = serializer.data
        print(tasks_with_distances)
        for task in tasks_with_distances:
            if task['contractor'] is not None:
                contractor = Contractor.objects.filter(id=task['contractor'])
                contractor_serializer = ContractorSerializer(contractor, many=True)
                task['contractor'] = contractor_serializer.data[0]
                task['contractor']['distance'] = get_distance(user.zip_code, task['contractor']['zip_code'])
            else:
                task['contractor'] = {
                    "id": -1,
                    "email": "",
                    "phone_number": "",
                    "zip_code": "",
                    "company_name": "",
                    "category": "",
                    "rating": "",
                    "distance": ""
                }
                
        return tasks_with_distances
    except Exception as e:
        return {"error": str(e)}


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
        return Response({"error": "incorrect task id, task not found"}, status=status.HTTP_404_NOT_FOUND)




# Ahmad - Update a task
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_task(request):
    # Extract data from the request body
    # For this function, only task_id is required
    data = request.data
    print(data)
    task_id = data.get('task_id')
    task = Task.objects.get(id=task_id)

    # Check if task exists
    if not task:
        # Return error message if task does not exist
        return Response({"error": "Task does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    # Other fields only need to be entered if they are to be updated
    name = data.get('task_name')
    description = data.get('description')
    date = data.get('date')
    is_completed = data.get('is_completed')
    contractor_email = data.get('contractor_email')
    category = data.get('category')


    for key, value in data.items():
        print(f'{key}: {value}\n')
    # Checking if contractor email was provided
    # print(f'contractor email: {contractor_email}\n')
    if contractor_email:
        if contractor_email != "unlink":
            try:
                # checking if contractor with provided email exists
                contractor = Contractor.objects.get(email=contractor_email)
                print(f'task category: {task.category}\ncontractor category: {contractor.category}\n')
                if category != contractor.category:
                    return Response({"error": "Contractor category does not match task category"}, status=status.HTTP_400_BAD_REQUEST)

                # connect task and contractor
                task.contractor = contractor
                task.save()

            except Contractor.DoesNotExist:
                # only printing error message so that update will continue with other fields
                print(f'Contractor with email: {contractor_email} does not exist')

        elif contractor_email == "unlink":
            task.contractor = None
            task.save()
    elif task.contractor:
            if task.contractor.category != category:
                return Response({"error": f"Contractor category ({task.contractor.category}) does not match task category ({category})"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        # Getting update fields that were explicitly provided in request body
        update_fields = {key: value for key, value in data.items() if key in ['name', 'description', 'date', 'is_completed', 'category']}
        # Update task with the other provided fields
        Task.objects.filter(id=task_id).update(**update_fields)

        # Return success message
        
        return Response(get_tasks_helper(request.user), status=status.HTTP_200_OK)
    
    except Exception as e:
        # Return error message if any exception occurs while updating task
        return Response({"error": e}, status=status.HTTP_409_CONFLICT)


# See Pdrer - Get tasks
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_info(request):
    user = request.user
    token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    print(token)
    if hasattr(user, 'contractor'):
        contractor = Contractor.objects.get(id=user.id)
        tasks = Task.objects.filter(contractor=contractor)
        serialized_tasks = TaskSerializer(tasks, many=True)
        serialized_tasks = serialized_tasks.data
        for i in range(len(serialized_tasks)):
            serialized_tasks[i]['customer_name'] = tasks[i].to_do_list.user.name
            serialized_tasks[i]['customer_email'] = tasks[i].to_do_list.user.email
            serialized_tasks[i]['customer_phone'] = tasks[i].to_do_list.user.phone_number
            serialized_tasks[i]['customer_zip'] = tasks[i].to_do_list.user.zip_code
        userInfo = {
            "id": user.id,
            "email": contractor.email,
            "phone_number": contractor.phone_number,
            "zip_code": contractor.zip_code,
            "company_name": contractor.company_name,
            "category": contractor.category,
            "rating": contractor.rating,
            "token": token,
            "is_contractor": "true",
            "tasks": serialized_tasks
        }
    else:
        customer = Customer.objects.get(id=user.id)
        userInfo = {
            "id": user.id,
            "email": user.email,
            "name": customer.name,
            "phone_number": user.phone_number,
            "zip_code": user.zip_code,
            "token": token,
            "is_contractor": "false",
            "tasks": get_tasks_helper(user)
        }   

        # returns token
    # Return JSON of serialized tasks
    return Response(userInfo, status=status.HTTP_200_OK)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    # Extract data from the request body
    data = request.data
    user = request.user
    email = data.get('email')
    phone_number = data.get('phone_number')
    name = data.get('name')
    zip = data.get('zip_code')
    company_name = data.get('company_name')

    # if email is not valid, return error message
    # need to validate that email is in correct format
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not phone_number:
        return Response({"error": "Phone number is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not zip:
        return Response({"error": "Zip code is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        validate_email(email)
    except:
        return Response({"error": "Please enter a valid email address"}, status=status.HTTP_400_BAD_REQUEST)

    for key, value in data.items():
        print(f'{key}: {value}\n')

    # Check for valid zip code (see helpers.py)
    if not validate_zip(zip):
        return Response({"error": "Invalid zip code"}, status=status.HTTP_400_BAD_REQUEST)
    
    # If company name and category are provided, create a Contractor
    if (company_name):
        # Check if Contractor with provided email or phone number already exists
        if Contractor.objects.filter(email=email).exists() and email != user.email:
            return Response({"error": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        
        if Contractor.objects.filter(phone_number=phone_number).exists() and phone_number != user.phone_number:
            return Response({"error": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
        
        # update contractor
        print(f'user id from django: {user.id}')
        try:
            Contractor.objects.filter(id=user.id).update(
                email=email, 
                phone_number=phone_number,
                zip_code=zip,
                company_name=company_name,
            )
            serializer = ContractorSerializer(Contractor.objects.get(id=user.id))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            # Handle exceptions if any while creating a new Contractor
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    else:
        # Check if Customer with provided email or phone number already exists
        if Customer.objects.filter(email=email).exists() and email != user.email:
            return Response({"error": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        
        if Customer.objects.filter(phone_number=phone_number).exists() and phone_number != user.phone_number:
            return Response({"error": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
        
        # Create a new Customer
        try:
            Customer.objects.filter(id=user.id).update(
                email=email, 
                name=name,
                phone_number=phone_number,
                zip_code=zip
            )
            serializer = CustomerSerializer(Customer.objects.get(id=user.id))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle exceptions if any while creating a new Customer
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        return Response({"error": "Invalid or missing parameter(s)"}, status=status.HTTP_400_BAD_REQUEST)
    
    if distance < 0:
        # Error handling if distance is negative
        return Response({"error": "Distance cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)
    if distance == 0:
        contractors = Contractor.objects.filter(zip_code=user.zip_code, category=category)
        serializer = ContractorSerializer(contractors, many=True)
        for contractor in serializer.data:
            contractor['distance'] = 0
        return Response(serializer.data, status=status.HTTP_200_OK)
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

