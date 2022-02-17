from api.views.month.utils import getNewMonths
from api.models import Account, Month
from api.utils.serializers import AccountSerializer
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from .utils import checkAndCreateBank
import json

def putAccount(request):
  
  reqData = json.loads(request.body)
  headers = request.headers

  account_id = reqData.get('id')
  account = reqData.get('account')
  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank')
  to_id = reqData.get('to')
  datetime = reqData.get('datetime')

  accountData = get_object_or_404(Account, pk=account_id)

  new_month_id = None
  new_to_id = None
  months = None

  actionType = 'WRITE' if to_id == None else 'SEND' if bank_id != None else 'MODIFY'
  bankMonthAccount = -account if actionType == 'SEND' else account
  toMonthAccount = account

  if (to_id):
    toMonth = Month.objects.get(user_id=user_id, bank_id=accountData.to, date=accountData.datetime[:7])
    expenditureGap = account - accountData.account # (바뀐 후 Account.account - 바뀌기 전 Account.account)
    # to_id만 삭제할 수 있는 경우는 없다.

    if (to_id != accountData.to) or (datetime[:7] != accountData.datetime[:7]):
      # to 를 변경하거나 Datetime 의 달을 변경하는 경우.
      toMonth.expenditure = toMonth.expenditure - accountData.account # 기존 Month
      new_to_id = checkAndCreateBank(user_id, to_id, datetime, toMonthAccount, headers) # 새로운 Month

    else :
      toMonth.expenditure = toMonth.expenditure + expenditureGap

    toMonth.save()

  # ==== MONTH LINK START ====
  # Bank 를 변경하는 경우와 Datetime 을 변경하는 경우에는 Month를 다시 연결해야 한다. 

  if (accountData.month_id == None):
    # 이미 Bank 와 연결 된 Month 데이터가 없는 경우

    if (bank_id):
      # Bank ID 가 Request 에서 넘어왔다면, Bank를 새로 연결하는 것이다. Bank와 연결 된 새로운 Month를 생성한다.
      new_month_id = checkAndCreateBank(user_id, bank_id, datetime, bankMonthAccount, headers)


  else:
    # 이미 Bank 와 연결 된 Month 데이터가 있는 경우, 기존 Month 데이터를 지우고 새로운 Month 데이터를 연결해야 한다.
    month = Month.objects.get(id=accountData.month_id)
    expenditureGap = account - accountData.account # (바뀐 후 Account.account - 바뀌기 전 Account.account)

    if (bank_id == None):
      # Bank 를 제거하는 경우: 기존 Month 데이터의 Expenditure 만 수정해주면 된다.
      month.expenditure = month.expenditure - bankMonthAccount # 기존 Month
      accountData.month_id = None

    elif (bank_id != accountData.bank_id) or (datetime[:7] != accountData.datetime[:7]):
      # Bank 를 변경하거나 Datetime 의 달을 변경하는 경우이다.
      month.expenditure = month.expenditure - bankMonthAccount # 기존 Month
      new_month_id = checkAndCreateBank(user_id, bank_id, datetime, bankMonthAccount, headers) # 새로운 Month

    else: # 아무것도 하지 않거나 Account 만 변경하는 경우
      month.expenditure = month.expenditure - expenditureGap if actionType == 'SEND' else month.expenditure + expenditureGap

    month.save()

  if new_month_id != None:
    accountData.month_id = new_month_id

  if new_to_id != None:
    accountData.to = new_month_id
  

  # ==== MONTH LINK END ====


  # Bank 관련 변경되는 경우에는 새로운 Months 데이터를 다시 전달 합니다.
  if bank_id or accountData.bank_id:
    months = getNewMonths(
      user_id, 
      bank_id if bank_id != None else accountData.bank_id,
      datetime[:7],
      headers,
    )

  for k in reqData:
    setattr(accountData, k, reqData[k])

  accountData.save()


  data = {
    'account': AccountSerializer(accountData, many=False).data,
    'months': months,
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
