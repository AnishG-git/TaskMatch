from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import CustomUser, Customer, Contractor, ToDoList, Task
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

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

