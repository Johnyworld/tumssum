from api.utils.getJsonFromObject import getAccountsFromObject
from api.models import Account
from rest_framework.response import Response


def getAccounts(reqData):
  user_id = reqData.get('user_id')
  category_id = reqData.get('category_id')
  bank_id = reqData.get('bank_id')
  month_id = reqData.get('month_id')
  
  results1 = Account.objects.filter(user_id = user_id)
  results2 = results1.filter(category_id = category_id) if category_id != None else results1
  results3 = results2.filter(bank_id = bank_id) if bank_id != None else results2
  results4 = results3.filter(month_id = month_id) if month_id != None else results3

  return Response(getAccountsFromObject(results4))


def postAccount(reqData):
  return Response(True)


def putAccount(reqData):
  return Response(True)


def deleteAccount(reqData):
  return Response(True)