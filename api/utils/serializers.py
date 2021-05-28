from rest_framework import serializers
from ..models import *


class UserSerializer(serializers.ModelSerializer):
  name = serializers.SerializerMethodField(read_only=True)
  is_admin = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'name', 'is_admin']

  def get_is_admin(self, obj):
    return obj.is_staff
  
  def get_name(self, obj):
    name = obj.first_name
    if name == '':
      name = obj.email
    return name


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'


class CategoryGroupSerializer(serializers.ModelSerializer):
  categories = CategorySerializer(many=True, read_only=True)

  class Meta:
    model = CategoryGroup
    fields = '__all__'
    extra_fields = ['categories']


class BankSerializer(serializers.ModelSerializer):
  class Meta:
    model = Bank
    fields = '__all__'


class BankGroupSerializer(serializers.ModelSerializer):
  banks = BankSerializer(many=True, read_only=True)

  class Meta:
    model = BankGroup
    fields = '__all__'
    extra_fields = ['banks']


class BudgetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Budget
    fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
  category_title = serializers.ReadOnlyField(source='category.title')
  bank_title = serializers.ReadOnlyField(source='bank.title')

  class Meta:
    model = Account
    fields = '__all__'
    extra_fields = ['category_title', 'bank_title']

