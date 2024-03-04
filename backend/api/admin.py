from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class CustomerAdmin(UserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'zip_code', 'password1', 'password2'),
            }
        ),
    )

class ContractorAdmin(UserAdmin):
    model = models.Contractor
    list_display = ['email', 'username', 'company_name', 'category', 'rating']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'company_name', 'category', 'rating', 'password1', 'password2'),
            }
        ),
    )


admin.site.register(models.Customer, CustomerAdmin)
admin.site.register(models.Contractor, ContractorAdmin)