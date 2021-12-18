from django.contrib import admin
from .models import *



class CategoryInline(admin.TabularInline):
  model = Category
  extra = 1


class BankInline(admin.TabularInline):
  model = Bank
  extra = 1


class CategoryGroupAdmin(admin.ModelAdmin):
  list_display = ('id', 'title')
  search_fields = ['title']


class CategoryAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'group', 'user')
  search_fields = ['title']


class BankGroupAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'user')
  search_fields = ['title']


class BankAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'group', 'balance', 'user')
  search_fields = ['title']


class MonthAdmin(admin.ModelAdmin):
  list_display = ('id', 'date', 'user', 'bank', 'expenditure')
  search_fields = ['title']


class BudgetAdmin(admin.ModelAdmin):
  list_display = ('id', 'date', 'user', 'category', 'budget')
  search_fields = ['title']


class AccountAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'user', 'category', 'bank', 'month', 'account', 'datetime')
  search_fields = ['title']



# Register your models here.
admin.site.register(CategoryGroup, CategoryGroupAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(BankGroup, BankGroupAdmin)
admin.site.register(Bank, BankAdmin)
admin.site.register(Month, MonthAdmin)
admin.site.register(Budget, BudgetAdmin)
admin.site.register(Account, AccountAdmin)