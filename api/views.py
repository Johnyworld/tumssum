from rest_framework.decorators import api_view
from .controllers import userController, categoryController, bankController, budgetController
import json


###################### USER ######################
@api_view(['GET'])
def users(request):
  if request.method == 'GET':
    return userController.getUsers()


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return userController.getUser(reqData)

  elif request.method == 'POST':
    return userController.postUser(reqData)

  elif request.method == 'PUT':
    return userController.putUser(reqData)

  elif request.method == 'DELETE':
    return userController.deleteUser(reqData)


###################### CATEGORY ######################
@api_view(['GET'])
def categories(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return categoryController.getCategories(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def category(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return categoryController.postCategory(reqData)

  elif request.method == 'PUT':
    return categoryController.putCategory(reqData)

  elif request.method == 'DELETE':
    return categoryController.deleteCategory(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def categoryGroup(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return categoryController.postCategoryGroup(reqData)

  elif request.method == 'PUT':
    return categoryController.putCategoryGroup(reqData)

  elif request.method == 'DELETE':
    return categoryController.deleteCategoryGroup(reqData)


###################### BANK ######################
@api_view(['GET'])
def banks(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return bankController.getBanks(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def bank(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return bankController.postBank(reqData)

  elif request.method == 'PUT':
    return bankController.putBank(reqData)

  elif request.method == 'DELETE':
    return bankController.deleteBank(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def bankGroup(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return bankController.postBankGroup(reqData)

  elif request.method == 'PUT':
    return bankController.putBankGroup(reqData)

  elif request.method == 'DELETE':
    return bankController.deleteBankGroup(reqData)


###################### Budget ######################
@api_view(['GET'])
def budgets(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return budgetController.getBudgets(reqData)

@api_view(['POST', 'PUT', 'DELETE'])
def budget(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return budgetController.postBudget(reqData)

  elif request.method == 'PUT':
    return budgetController.putBudget(reqData)

  elif request.method == 'DELETE':
    return budgetController.deleteBudget(reqData)