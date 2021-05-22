from django.db import models

# Create your models here.
class User(models.Model):
  email = models.CharField(max_length=40)
  password = models.CharField(max_length=40)
  username = models.CharField(max_length=20)
  is_deleted = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  deleted_at = models.DateTimeField(blank=True)
  last_login = models.DateTimeField(blank=True)
