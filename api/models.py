from django.db import models
from django.contrib.auth.models import User


class CategoryGroup(models.Model):
  # Require fields
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class Category(models.Model):
  # Require fields
  title = models.CharField(max_length=20)
  # Required Relations
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  # Not Required Relations
  group = models.ForeignKey(CategoryGroup, related_name='categories', on_delete=models.CASCADE, blank=True, null=True)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class BankGroup(models.Model):
  # Require fields
  title = models.CharField(max_length=20)
  # Required Relations
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class Bank(models.Model):
  # Require fields
  title = models.CharField(max_length=20)
  balance = models.IntegerField()
  # Required Relations
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  # Not Required Relations
  group = models.ForeignKey(BankGroup, related_name='banks', on_delete=models.CASCADE, blank=True, null=True)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.title


class Month(models.Model):
  # Require fields
  date = models.CharField(max_length=7)
  carry_over = models.IntegerField()
  total_account = models.IntegerField()
  # Required Relations
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.date


class Budget(models.Model):
  # Require fields
  budget = models.IntegerField()
  # Required Relations
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  # Not Require fields
  date = models.CharField(max_length=7, blank=True)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.date


class Account(models.Model):
  # Require fields
  title = models.CharField(max_length=40)
  account = models.IntegerField()
  datetime = models.DateTimeField()
  # Required Relations
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  # Not Require fields
  memo = models.CharField(max_length=256, blank=True)
  location = models.CharField(max_length=512, blank=True)
  # Not Required Relations
  category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
  bank = models.ForeignKey(Bank, on_delete=models.CASCADE, blank=True, null=True)
  month = models.ForeignKey(Month, on_delete=models.CASCADE, blank=True, null=True)
  # Dates
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.title
