from django.db import models

# Create your models here.
class User(models.Model):
  username = models.CharField(max_length=20)
  email = models.CharField(max_length=40)
  password = models.CharField(max_length=40)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  deleted_at = models.DateTimeField(blank=True, null=True)
  last_login = models.DateTimeField(blank=True, null=True)
  is_deleted = models.BooleanField(default=False)
  def __str__(self):
    return self.username


class CategoryGroup(models.Model):
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class Category(models.Model):
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  group = models.ForeignKey(CategoryGroup, on_delete=models.CASCADE, blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class BankGroup(models.Model):
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class Bank(models.Model):
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  group = models.ForeignKey(BankGroup, on_delete=models.CASCADE, blank=True, null=True)
  balance = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.title


class Month(models.Model):
  date = models.CharField(max_length=7)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
  carry_over = models.IntegerField()
  total_account = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.date


class Budget(models.Model):
  date = models.CharField(max_length=7, blank=True, null=True)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  budget = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.date


class Account(models.Model):
  title = models.CharField(max_length=40)
  memo = models.CharField(max_length=256, blank=True, null=True)
  location = models.TextField(blank=True, null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
  bank = models.ForeignKey(Bank, on_delete=models.CASCADE, blank=True, null=True)
  month = models.ForeignKey(Month, on_delete=models.CASCADE, blank=True, null=True)
  datetime = models.DateTimeField()
  account = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.title
