from api.views.month.utils import getNewMonths
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.models import Account, Bank, Month
import json


def deleteAccount(request):

  reqData = json.loads(request.body)
  headers = request.headers

  user_id = reqData.get('user_id')
  account_id = reqData.get('account_id')

  months = None

  accountData = get_object_or_404(Account, pk=account_id)

  if (accountData.month_id != None):
    month = Month.objects.get(id=accountData.month_id)
    month.expenditure = month.expenditure - accountData.account
    month.save()

  if (accountData.to != None):
    toMonth = Month.objects.get(user_id=user_id, bank_id=accountData.to, date=accountData.datetime[:7])
    toMonth.expenditure = toMonth.expenditure + accountData.account if accountData.bank else toMonth.expenditure - accountData.account
    toMonth.save()

  if accountData.bank_id:
    months = getNewMonths(
      user_id, 
      accountData.bank_id,
      accountData.datetime[:7],
      headers,
    )


  accountData.delete()

  data = {
    'account': account_id,
    'months': months,
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
	