from django.shortcuts import get_object_or_404
from api.utils.serializers import AccountSerializer
from api.models import Account
from rest_framework.response import Response


def getAccounts(reqData):
  user_id = reqData.get('user_id')
  category_id = reqData.get('category_id') # Not Required
  bank_id = reqData.get('bank_id') # Not Required
  month_id = reqData.get('month_id') # Not Required
  
  results1 = Account.objects.filter(user_id = user_id)
  results2 = results1.filter(category_id = category_id) if category_id != None else results1
  results3 = results2.filter(bank_id = bank_id) if bank_id != None else results2
  results4 = results3.filter(month_id = month_id) if month_id != None else results3

  return Response(AccountSerializer(results4, many=True).data)


def postAccount(reqData):
  title = reqData.get('title')
  account = reqData.get('account')
  datetime = reqData.get('datetime')
  user_id = reqData.get('user_id')
  memo = reqData.get('memo') # Not Required
  location = reqData.get('location') # Not Required
  category_id = reqData.get('category_id') # Not Required
  bank_id = reqData.get('bank_id') # Not Required
  month_id = reqData.get('month_id') # Not Required

  newAccount = Account(
    title = title,
    account = account,
    datetime = datetime,
    user_id = user_id,
    memo = memo if memo != None else '',
    location = location if location != None else '',
    category_id = category_id,
    bank_id = bank_id,
    month_id = month_id,
  )

  newAccount.save()

  return Response(AccountSerializer(newAccount, many=False).data)


def putAccount(reqData):
  account_id = reqData.get('account_id')

  account = get_object_or_404(Account, pk=account_id)
  for k in reqData:
    setattr(account, k, reqData[k])
  account.save()
  return Response(AccountSerializer(account, many=False).data)


def deleteAccount(reqData):
  account_id = reqData.get('account_id')

  account = get_object_or_404(Account, pk=account_id)
  account.delete()
  return Response(True)