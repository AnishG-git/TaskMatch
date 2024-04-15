from rest_framework import serializers
from .models import Task, Contractor, Customer

# serializer to convert task to JSON
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'date', 'is_completed', 'contractor', 'category']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'phone_number', 'zip_code', 'name']

# serializers to convert contractor to JSON
class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['id', 'email', 'phone_number', 'zip_code', 'company_name', 'rating', 'category']