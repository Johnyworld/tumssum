from django.urls import path
from . import views 

urlpatterns = [
  path('user/', views.users, name='user'),
  path('user/<str:id>/', views.user, name='detail'),
]
