from django.urls import path
from . import views 

urlpatterns = [
  path('user/', views.user, name='user'),
  path('users/', views.users, name='users'),
  path('categories/', views.categories, name='categories'),
  path('category/', views.category, name='category'),
  path('category-group/', views.categoryGroup, name='categoryGroup'),
]
