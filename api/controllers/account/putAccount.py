from api.models import Account, Month
from api.utils.serializers import AccountSerializer
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from .utils import checkAndCreateBank
import json

def putAccount(request):
  reqData = json.loads(request.body)
  headers = request.headers

  account_id = reqData.get('account_id')
  account = reqData.get('account')
  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank_id')
  datetime = reqData.get('datetime')

  new_month_id = None

  accountData = get_object_or_404(Account, pk=account_id)

  expenditureGap = account - accountData.account if account != None else 0 # (바뀐 후 Account.account - 바뀌기 전 Account.account)

  if (accountData.month_id): # 이미 Bank 와 연결 된 Month 데이터가 있다.
    month = Month.objects.get(id=accountData.month_id)

    if (datetime[:7] != accountData.datetime[:7]):
      month.expenditure = month.expenditure - accountData.account # 기존 Month
      new_month_id = checkAndCreateBank(
        user_id,
        bank_id if bank_id != None else accountData.bank_id,
        datetime,
        account if account != None else accountData.account,
        headers
      ) # 새로운 Month

    elif (bank_id == None): # Bank 를 제거하는 경우
      month.expenditure = month.expenditure - accountData.account # 기존 Month
      accountData.month_id = None

    elif (bank_id != accountData.bank_id): # Bank 를 변경하는 경우
      month.expenditure = month.expenditure - accountData.account # 기존 Month
      new_month_id = checkAndCreateBank(user_id, bank_id, datetime, account, headers) # 새로운 Month

    else: # 아무것도 하지 않거나 Account 만 변경하는 경우
      month.expenditure = month.expenditure + expenditureGap

    month.save()

  else: # 이미 Bank 와 연결 된 Month 데이터가 없는 경우
    if (bank_id): # Bank ID 가 Request 에서 넘어왔다면, Bank와 연결 된 새로운 Month를 생성한다.
      new_month_id = checkAndCreateBank(user_id, bank_id, datetime, account, headers)

  for k in reqData:
    setattr(accountData, k, reqData[k])

  if new_month_id != None:
    accountData.month_id = new_month_id

  accountData.save()

  res = { 'ok': True, 'data': AccountSerializer(accountData, many=False).data }
  return JsonResponse(res)
