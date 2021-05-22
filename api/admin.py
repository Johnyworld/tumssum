from django.contrib import admin
from .models import User, CategoryGroup, Category, CategoryLink, BankGroup, Bank



class CategoryInline(admin.TabularInline):
  model = Category
  extra = 1

class CategoryLinkInline(admin.TabularInline):
  model = CategoryLink
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
  inlines = [CategoryLinkInline, BankInline]
  list_filter = ['is_deleted', 'created_at']
  search_fields = ['email', 'username']


class CategoryGroupAdmin(admin.ModelAdmin):
  list_display = ('title', 'id')
  search_fields = ['title']


class CategoryAdmin(admin.ModelAdmin):
  list_display = ('title', 'id')
  search_fields = ['title']


class CategoryLinkAdmin(admin.ModelAdmin):
  list_display = ('group', 'user')
  search_fields = ['user', 'group']


class BankGroupAdmin(admin.ModelAdmin):
  list_display = ('title', 'id', 'user')
  search_fields = ['title']


class BankAdmin(admin.ModelAdmin):
  list_display = ('title', 'id', 'user', 'balance')
  search_fields = ['title']


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(CategoryGroup, CategoryGroupAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(CategoryLink, CategoryLinkAdmin)
admin.site.register(BankGroup, BankGroupAdmin)
admin.site.register(Bank, BankAdmin)
# admin.site.register(Month)
# admin.site.register(Account)