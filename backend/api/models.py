from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    USERNAME_FIELD = 'email'
    phone_number = models.CharField(max_length=15, unique=True, blank=False)
    zip_code = models.CharField(max_length=10, blank=False)
    # is_customer = models.BooleanField(default=True, blank=False)
    REQUIRED_FIELDS = ['username',]
    
class Customer(CustomUser):
    # add to do list instance
    name = models.CharField(max_length=50, blank=False, default='name')
    def __str__(self):
        return f'Customer name: {self.first_name}\nCustomer email: {self.email}'
    
class Contractor(CustomUser):
    company_name = models.CharField(max_length=50, blank=False)
    category = models.CharField(max_length=50, blank=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    def __str__(self):
        return f'Contractor name: {self.company_name}\nContractor email: {self.email}'