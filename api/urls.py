from django.urls import path
from . import views 

urlpatterns = [
  path('user/', views.user, name='user'),
  path('users/', views.users, name='users'),

  path('categories/', views.categories, name='categories'),
  path('category/', views.category, name='category'),
  path('category-group/', views.categoryGroup, name='categoryGroup'),

  path('banks/', views.banks, name='banks'),
  path('bank/', views.bank, name='bank'),
  path('bank-group/', views.bankGroup, name='bankGroup'),

  path('budgets/', views.budgets, name='budgets'),
  path('budget/', views.budget, name='budget'),
]
