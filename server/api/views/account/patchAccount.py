from api.views.month.utils import getNewMonths
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import AccountSerializer
from api.models import Account, Month
from .utils import checkAndCreateBank
import json


def patchAccount(request):
  reqData = json.loads(request.body)
  headers = request.headers

  account_id = reqData.get('id')
  title = reqData.get('title')
  account = reqData.get('account')
  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank')
  category_id = reqData.get('category')
  datetime = reqData.get('datetime')

  accountData = get_object_or_404(Account, pk=account_id)

  new_month_id = None
  new_to_id = None
  months = None

  actionType = 'WRITE' if accountData.to == None else 'SEND' if accountData.bank != None else 'MODIFY'
  bankMonthAccount = -accountData.account if actionType == 'SEND' else accountData.account
  toMonthAccount = accountData.account

  if (accountData.to != None):
    if (datetime[:7] != accountData.datetime[:7]):
      toMonth = Month.objects.get(user_id=user_id, bank_id=accountData.to, date=accountData.datetime[:7])
      toMonth.expenditure = toMonth.expenditure - toMonthAccount 
      toMonth.save()
      new_to_id = checkAndCreateBank(
        user_id,
        accountData.to,
        datetime,
        toMonthAccount,
        headers
      )

  if (accountData.month_id == None):
    if (bank_id):
      new_month_id = checkAndCreateBank(user_id, bank_id, accountData.datetime, bankMonthAccount, headers)

  else:
    month = Month.objects.get(id=accountData.month_id)

    if (bank_id == 0):
      month.expenditure = month.expenditure - bankMonthAccount
      accountData.month_id = None

    elif (bank_id):
      month.expenditure = month.expenditure - bankMonthAccount
      new_month_id = checkAndCreateBank(user_id, bank_id, accountData.datetime, bankMonthAccount, headers)

    elif (datetime):
      if (datetime[:7] != accountData.datetime[:7]):
        month.expenditure = month.expenditure - bankMonthAccount 
        new_month_id = checkAndCreateBank(
          user_id,
          accountData.bank_id,
          datetime,
          bankMonthAccount,
          headers
        )

    elif (account):
      expenditureGap = account - bankMonthAccount
      month.expenditure = month.expenditure + expenditureGap

    month.save()



  # Bank ?????? ???????????? ???????????? ????????? Months ???????????? ?????? ?????? ?????????.
  if bank_id or accountData.bank_id:
    months = getNewMonths(
      user_id, 
      bank_id if bank_id != None else accountData.bank_id,
      datetime[:7] if datetime != None else accountData.datetime,
      headers,
    )

  if new_to_id != None:
    toMonths = getNewMonths(
      user_id, 
      accountData.to,
      datetime[:7] if datetime != None else accountData.datetime,
      headers,
    )
    months = months  + toMonths if (months != None) else toMonths

  if new_month_id != None:
    accountData.month_id = new_month_id


  if title != None:
    accountData.title = title

  if account != None:
    accountData.account = account

  if datetime != None:
    accountData.datetime = datetime

  if bank_id == 0:
    accountData.bank_id = None 
  elif bank_id != None:
    accountData.bank_id = bank_id 

  if category_id == 0:
    accountData.category_id = None 
  elif category_id != None:
    accountData.category_id = category_id 

  accountData.save()

  data = {
    'account': AccountSerializer(accountData, many=False).data,
    'months': months,
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
	