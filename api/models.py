from django.db import models
from django.db.models.fields import CharField

# Create your models here.
class User(models.Model):
  email = models.CharField(max_length=40)
  password = models.CharField(max_length=40)
  username = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  last_login = models.DateTimeField(auto_now=True)
