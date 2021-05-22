from django.db import models

# Create your models here.
class User(models.Model):
  email = models.CharField(max_length=40)
  password = models.CharField(max_length=40)
  username = models.CharField(max_length=20)
  is_deleted = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  deleted_at = models.DateTimeField(blank=True, null=True)
  last_login = models.DateTimeField(blank=True, null=True)
  def __str__(self):
    return self.username


class CategoryGroup(models.Model):
  title = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class Category(models.Model):
  title = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title


class CategoryLink(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  group = models.ForeignKey(CategoryGroup, on_delete=models.CASCADE, blank=True, null=True)
  categories = models.ManyToManyField(Category, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class BankGroup(models.Model):
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class Bank(models.Model):
  title = models.CharField(max_length=20)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  group = models.ForeignKey(BankGroup, on_delete=models.CASCADE, blank=True, null=True)
  balance = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True) 


# class Month(models.Model):
#   date = models.CharField(max_length=7)
#   bank = ForeignKey(Bank, on_delete=models.CASCADE)
#   carry_over = models.IntegerField()
#   total_account = models.IntegerField()
#   created_at = models.DateTimeField(auto_now_add=True)
#   updated_at = models.DateTimeField(auto_now=True) 


# class Account(models.Model):
#   title = models.CharField(max_length=40)
#   memo = models.CharField(max_length=256, blank=True)
#   location = models.TextField(blank=True)
#   category = models.ForeignKey(Category, on_delete=models.CASCADE)
#   bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
#   month = models.ForeignKey(Month, on_delete=models.CASCADE)
#   datetime = models.DateTimeField()
#   account = models.IntegerField()
#   created_at = models.DateTimeField(auto_now_add=True)
#   updated_at = models.DateTimeField(auto_now=True) 
