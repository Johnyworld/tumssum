import json
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
import requests
from api.utils.serializers import AccountSerializer
from api.models import Account, Month


def checkAndCreateBank(user_id, bank_id, datetime, account, headers):
  month_id = None
  if (bank_id != None):
    try:
      month = Month.objects.get(bank_id=bank_id, date=datetime[:7])
      month.expenditure = month.expenditure + account
      month.save()
      month_id = month.id
    except:
      data = {
        'user_id': user_id,
        'bank_id': bank_id,
        'date': datetime[:7],
        'expenditure': account,
      }
      res = requests.post("http://127.0.0.1:8000/api/month/", json=data, headers=headers)
      new_month_id = json.loads(res.text).get('data').get('id')
      month_id = new_month_id
      # else:
      #   res = { 'ok': True, 'message': '뱅크 연결에 실패했습니다.' }
      #   return JsonResponse(res) 
  return month_id


def getAccounts(request):
  user_id = request.GET.get('user_id')
  category_id = request.GET.get('category_id') # Not Required
  bank_id = request.GET.get('bank_id') # Not Required
  month_id = request.GET.get('month_id') # Not Required
  
  results1 = Account.objects.filter(user_id = user_id).order_by('datetime')
  results2 = results1.filter(category_id = category_id) if category_id != None else results1
  results3 = results2.filter(bank_id = bank_id) if bank_id != None else results2
  results4 = results3.filter(month_id = month_id) if month_id != None else results3

  res = { 'ok': True, 'data': AccountSerializer(results4, many=True).data }
  return JsonResponse(res)


def postAccount(reqData, headers):
  title = reqData.get('title')
  account = reqData.get('account')
  datetime = reqData.get('datetime')
  user_id = reqData.get('user_id')
  memo = reqData.get('memo') # Not Required
  location = reqData.get('location') # Not Required
  category_id = reqData.get('category_id') # Not Required
  bank_id = reqData.get('bank_id') # Not Required
  month_id = None

  # TODO Month _id 는 parameter 로 받지 말고 Month 에서 date (from datetime) 로 검색해서 찾아내자

  if (bank_id != None):
    try:
      month = Month.objects.get(bank_id=bank_id, date=datetime[:7])
      month.expenditure = month.expenditure + account;
      month.save()
      month_id = month.id
    except:
      data = {
        'user_id': user_id,
        'bank_id': bank_id,
        'date': datetime[:7],
        'expenditure': account,
      }
      res = requests.post("http://127.0.0.1:8000/api/month/", json=data, headers=headers)
      new_month_id = json.loads(res.text).get('data').get('id')
      month_id = new_month_id
      # else:
      #   res = { 'ok': True, 'message': '뱅크 연결에 실패했습니다.' }
      #   return JsonResponse(res)


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

  

  res = { 'ok': True, 'data': AccountSerializer(newAccount, many=False).data }
  return JsonResponse(res)


def putAccount(reqData, headers):
  account_id = reqData.get('account_id')
  account = reqData.get('account')
  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank_id')
  datetime = reqData.get('datetime')

  new_month_id = None

  accountData = get_object_or_404(Account, pk=account_id)

  expenditureGap = account - accountData.account if account != None else 0 # (바뀐 후 Account.account - 바뀌기 전 Account.account)

  # 현재 이 Account에 Bank와 Month가 있다.
    # [x] Bank 를 바꾸는 경우 =>
      # [x] 기존 Bank 에는 바뀌기 전 Account.account 값을 빼준다.
      # [x] 새로운 Bank에 Month 를 연결하고 Month.expenditure 값에 바뀌는 Account.account 값을 더해준다.
    # [x] Bank 를 삭제하는 경우 => Month.expenditure 값에서 바뀌기 전 Account.account 값을 빼준다.
    # [x] account 를 변경 하든 안하든 Month.expenditure 값에 expenditureGap 를 더한다.
    # 달이 바뀌는 경우

  # 현재 이 Account에 Bank와 Month가 없다.
    # [x] Bank 를 추가하는 경우 => Month 를 연결하고 expenditureGap 적용
    # [x] Bank 를 추가하지 않는 경우 => 아무일 없다.

  if (accountData.month_id): # 이미 Bank 와 연결 된 Month 데이터가 있다.
    month = Month.objects.get(id=accountData.month_id)
    print('------')
    print(datetime[:7])
    print(accountData.datetime[:7])
    print(datetime[:7] != accountData.datetime[:7])
    if (bank_id == None): # Bank 를 제거하는 경우
      month.expenditure = month.expenditure - accountData.account # 기존 Month
      accountData.month_id = None
    elif (bank_id != accountData.bank_id): # Bank 를 변경하는 경우
      month.expenditure = month.expenditure - accountData.account # 기존 Month
      new_month_id = checkAndCreateBank(user_id, bank_id, datetime, account, headers) # 새로운 Month
    elif (datetime[:7] != accountData.datetime[:7]):
      print('달이 바귀었구나')
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


def deleteAccount(reqData):
  account_id = reqData.get('account_id')
  # user_id = reqData.get('account_id')

  account = get_object_or_404(Account, pk=account_id)
  account.delete()
  res = { 'ok': True, 'data': account_id }
  return JsonResponse(res)
