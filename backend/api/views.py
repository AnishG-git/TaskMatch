from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import CustomUser, Customer, Contractor, ToDoList, Task
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import TaskSerializer, ContractorSerializer
from .helpers import get_distance, validate_zip
import heapq

# Create your views here.
@api_view(['POST'])
def register(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')
    name = data.get('name')
    zip = data.get('zip_code')
    company_name = data.get('company_name')
    category = data.get('category')
    if not validate_zip(zip):
        return Response({"status": "Invalid zip code"}, status=status.HTTP_400_BAD_REQUEST)
    if (company_name and category):
        if Contractor.objects.filter(email=email).exists():
            return Response({"status": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        if Contractor.objects.filter(phone_number=phone_number).exists():
            return Response({"status": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
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
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        if Customer.objects.filter(email=email).exists():
            return Response({"status": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
        if Customer.objects.filter(phone_number=phone_number).exists():
            return Response({"status": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
        try:
            Customer.objects.create_user(
                username=email,
                email=email, 
                name=name,
                password=password, 
                phone_number=phone_number,
                zip_code=zip
            )
            ToDoList.objects.create(user=Customer.objects.get(email=email))
            return Response({"status": "Customer created successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    user = authenticate(username=email, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        print(f'User: {email} logged in\nToken: {token.key}\n')
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        print(f'Invalid credentials for user: {email} or user does not exist\n')
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.auth.delete()
    return Response({"status": "Logout successful!"}, status=status.HTTP_200_OK)

# API to create a task
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    data = request.data
    user = request.user
    name = data.get('task_name')
    description = data.get('description')
    date = data.get('date')
    try:
        to_do_list = ToDoList.objects.get(user=user)
        task = Task.objects.create(
            name=name,
            description=description,
            date=date,
            to_do_list=to_do_list
        )
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"status": e}, status=status.HTTP_409_CONFLICT)

# API to delete a task    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request):
    data = request.data
    task_id = data.get('task_id')
    try:
        task = Task.objects.get(id=task_id)
        print(task)
        serializer = TaskSerializer(task)
        task.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Task.DoesNotExist:
        return Response({"status": "incorrect task id, task not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_task(request):
    data = request.data
    task_id = data.get('task_id')
    task = Task.objects.get(id=task_id)
    name = data.get('task_name')
    description = data.get('description')
    date = data.get('date')
    is_complete = data.get('is_complete')
    contractor_email = data.get('contractor_email')
    update_fields = {key: value for key, value in data.items() if key in ['name', 'description', 'date', 'is_complete']}
    if contractor_email:
        try:
            contractor = Contractor.objects.get(email=contractor_email)
            task.contractor = contractor
        except Contractor.DoesNotExist:
            print(f'Contractor with email: {contractor_email} does not exist')
    try:
        task.save()
        Task.objects.filter(id=task_id).update(**update_fields)
        return Response({"status": f"task (id: {task_id}) updated"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"status": e}, status=status.HTTP_409_CONFLICT)

# API to get all tasks

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    user = request.user
    to_do_list = ToDoList.objects.filter(user=user)
    tasks = Task.objects.filter(to_do_list__in=to_do_list)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    

# Search contractor API searches for contractor based on category and zip code
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_contractor(request):
    data = request.data
    user = request.user
    category = data.get('category')
    try:
        distance = float(request.query_params.get('distance', None))
    except ValueError:
        return Response({"status": "Invalid distance"}, status=status.HTTP_400_BAD_REQUEST)
    zip_code = user.zip_code
    unsorted_contractors = Contractor.objects.filter(category=category)
    contractors = []
    zip2distance = {}
    for contractor in unsorted_contractors:
        print(user.email)
        contractor_distance = get_distance(zip_code, contractor.zip_code)
        if distance and contractor_distance <= distance:
            heapq.heappush(contractors, (contractor_distance, contractor))
            zip2distance[contractor.zip_code] = contractor_distance
        elif not distance:
            heapq.heappush(contractors, (contractor_distance, contractor))
            zip2distance[contractor.zip_code] = contractor_distance
    if distance:
        sorted_contractors = [heapq.heappop(contractors)[1] for _ in range(len(contractors))]
    else:
        sorted_contractors = [heapq.heappop(contractors)[1] for _ in range(min(10, len(contractors)))]

    serializer = ContractorSerializer(sorted_contractors, many=True)
    sorted_contractors = serializer.data

    for i in range(len(sorted_contractors)):
        contractor = sorted_contractors[i]
        contractor['distance'] = zip2distance[contractor['zip_code']]

    return Response(sorted_contractors, status=status.HTTP_200_OK)
