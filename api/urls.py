from django.urls import path
from . import views 

urlpatterns = [
  path('hello/', views.getHello, name='hello')
]
