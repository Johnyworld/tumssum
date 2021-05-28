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


###################### BANK #####################
def getBankJsonFromObject(bank):
  data = {
    'bank_id': bank.id,
    'balance': bank.balance,
    'title': bank.title,
  }
  if bank.group is not None:
    data['bank_group_id'] = bank.group.id
  return data


def getBanksJsonFromObject(banks):
  arr = []
  for bank in banks:
    arr.append(getBankJsonFromObject(bank))
  return arr


def getBankGroupJsonFromObject(group, banks=None):
  data = {
    'bank_group_id': group.id,
    'title': group.title,
  }
  if banks is not None:
    data['banks'] = getBanksJsonFromObject(banks)
  return data


###################### BUDGET #####################
def getBudgetFromObject(budget):
  return {
    'budget_id': budget.id,
    'date': budget.date,
    'budget': budget.budget,
    'category': budget.category.id,
    'created_at': budget.created_at,
    'updated_at': budget.updated_at,
  }

def getBudgetsFromObject(budgets):
  arr = [];
  for budget in budgets:
    arr.append(getBudgetFromObject(budget))
  return arr


###################### BUDGET #####################
def getAccountFromObject(account):
  data = {
    'account_id': account.id,
    'title': account.title,
    'memo': account.memo,
    'location': account.location,
    'datetime': account.datetime,
    'account': account.account,
    'created_at': account.created_at,
    'updated_at': account.updated_at,
  }
  if account.category is not None:
    data['category'] = { 'category_id': account.category.id, 'title': account.category.title }
  if account.bank is not None:
    data['bank'] = { 'bank_id': account.bank.id, 'title': account.bank.title }
  if account.month is not None:
    data['month'] = { 'month_id': account.month.id, 'date': account.month.date }
  return data

def getAccountsFromObject(accounts):
  arr = [];
  for account in accounts:
    arr.append(getAccountFromObject(account))
  return arr
