from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import AccountSerializer
from api.models import Account, Month
from .utils import checkAndCreateBank
import json


def patchAccount(request):
  reqData = json.loads(request.body)
  headers = request.headers

  account_id = reqData.get('account_id')
  user_id = reqData.get('user_id')
  datetime = reqData.get('datetime')

  accountData = get_object_or_404(Account, pk=account_id)

  new_month_id = None

  if (accountData.month_id):
    if (datetime):
      if (datetime[:7] != accountData.datetime[:7]):
        month = Month.objects.get(id=accountData.month_id)
        month.expenditure = month.expenditure - accountData.account # 기존 Month
        new_month_id = checkAndCreateBank(
          user_id,
          accountData.bank_id,
          datetime,
          accountData.account,
          headers
        ) # 새로운 Month
        month.save()

  if new_month_id != None:
    accountData.month_id = new_month_id

  for k in reqData:
    setattr(accountData, k, reqData[k])
    
  accountData.save()

  res = { 'ok': True, 'data': AccountSerializer(accountData, many=False).data }
  return JsonResponse(res)
	