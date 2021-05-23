from django.contrib import admin
from .models import User, CategoryGroup, Category, BankGroup, Bank, Month, Budget, Account



class CategoryInline(admin.TabularInline):
  model = Category
  extra = 1

class BankInline(admin.TabularInline):
  model = Bank
  extra = 1



class UserAdmin(admin.ModelAdmin):
  # readonly_fields = ('id')
  list_display = ('username', 'id', 'email', 'created_at', 'is_deleted')
  # fieldsets = [
  #   (None,               { 'fields': ['username'] }),
  #   ('Email', { 'fields': ['email'] })
  # ]
  inlines = [CategoryInline, BankInline]
  list_filter = ['is_deleted', 'created_at']
  search_fields = ['email', 'username']


class CategoryGroupAdmin(admin.ModelAdmin):
  list_display = ('title', 'id')
  search_fields = ['title']


class CategoryAdmin(admin.ModelAdmin):
  list_display = ('title', 'group', 'user', 'id')
  search_fields = ['title']


class BankGroupAdmin(admin.ModelAdmin):
  list_display = ('title', 'id', 'user')
  search_fields = ['title']


class BankAdmin(admin.ModelAdmin):
  list_display = ('title', 'group', 'balance', 'user', 'id')
  search_fields = ['title']


class MonthAdmin(admin.ModelAdmin):
  list_display = ('date', 'bank', 'user', 'carry_over', 'total_account')
  search_fields = ['title']


class BudgetAdmin(admin.ModelAdmin):
  list_display = ('date', 'user', 'date', 'category', 'budget')
  search_fields = ['title']


class AccountAdmin(admin.ModelAdmin):
  list_display = ('title', 'user', 'category', 'bank', 'account', 'datetime')
  search_fields = ['title']



# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(CategoryGroup, CategoryGroupAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(BankGroup, BankGroupAdmin)
admin.site.register(Bank, BankAdmin)
admin.site.register(Month, MonthAdmin)
admin.site.register(Budget)
admin.site.register(Account, AccountAdmin)