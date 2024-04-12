from rest_framework import serializers
from .models import Task, Contractor

# serializer to convert task to JSON
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'date', 'is_completed', 'contractor']

# serializers to convert contractor to JSON
class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['id', 'email', 'phone_number', 'zip_code', 'company_name', 'rating']