from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    USERNAME_FIELD = 'email'
    phone_number = models.CharField(max_length=15, unique=True, blank=False)
    zip_code = models.CharField(max_length=10, blank=False)
    REQUIRED_FIELDS = ['username',]
    
class Customer(CustomUser):
    name = models.CharField(max_length=50, blank=False, default='name')
    def __str__(self):
        return f'{self.email}'
    
class Contractor(CustomUser):
    company_name = models.CharField(max_length=50, blank=False)
    category = models.CharField(max_length=50, blank=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    def __str__(self):
        return f'{self.email}'
    
class ToDoList(models.Model):
    user = models.OneToOneField(Customer, on_delete=models.CASCADE)
    def __str__(self):
        return f'To Do List belonging to {self.user}'
    
class Task(models.Model):
    id = models.AutoField(primary_key=True)
    to_do_list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False)
    description = models.TextField()
    date = models.DateField()
    is_completed = models.BooleanField(default=False)
    contractor = models.ForeignKey(Contractor, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return f'Task name: {self.name}'