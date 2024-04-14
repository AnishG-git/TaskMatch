from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class CustomerAdmin(UserAdmin):
    list_display = ['id', 'email', 'phone_number', 'zip_code']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'name', 'zip_code', 'password1', 'password2'),
            }
        ),
    )

class ContractorAdmin(UserAdmin):
    model = models.Contractor
    list_display = ['id', 'email', 'zip_code', 'phone_number', 'company_name', 'category', 'rating']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'company_name', 'category', 'rating', 'password1', 'password2'),
            }
        ),
    )

class TaskAdmin(admin.ModelAdmin):
    model = models.Task
    list_display = ['id', 'name', 'date', 'is_completed', 'contractor']


admin.site.register(models.Task, TaskAdmin)
admin.site.register(models.ToDoList)
admin.site.register(models.Contractor, ContractorAdmin)
admin.site.register(models.Customer, CustomerAdmin)
