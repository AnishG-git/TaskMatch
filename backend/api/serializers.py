from rest_framework import serializers
from .models import Task, Contractor

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'date', 'is_completed', 'contractor']

class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['id', 'email', 'phone_number', 'zip_code']