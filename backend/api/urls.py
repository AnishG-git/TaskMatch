from django.urls import path
from .views import register, login, logout, create_task, get_info, update_task, delete_task, search_contractor, update_profile


# Defining the URL patterns for the API
# All endpoints will be prefixed with http://127.0.0.1:8000/api/
urlpatterns = [
    path('register', register, name='register'),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('create-task', create_task, name='create_task'),
    path('get-info', get_info, name='get_tasks'),
    path('update-task', update_task, name='update_task'),
    path('delete-task', delete_task, name='delete_task'),
    path('search-contractors', search_contractor, name='search_contractor'),
    path('update-profile', update_profile, name='update_profile')
]