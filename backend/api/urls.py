from django.urls import path
from .views import register, login, logout, create_task, get_tasks, update_task, delete_task, search_contractor
# from .views import

urlpatterns = [
    path('register', register, name='register'),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('create-task', create_task, name='create_task'),
    path('get-tasks', get_tasks, name='get_tasks'),
    path('update-task', update_task, name='update_task'),
    path('delete-task', delete_task, name='delete_task'),
    path('search-contractors', search_contractor, name='search_contractor'),
]