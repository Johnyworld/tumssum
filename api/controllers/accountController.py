import json
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
import requests
from api.utils.serializers import AccountSerializer
from api.models import Account, Month


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


def putAccount(reqData):
  account_id = reqData.get('account_id')

  account = get_object_or_404(Account, pk=account_id)
  for k in reqData:
    setattr(account, k, reqData[k])
  account.save()
  res = { 'ok': True, 'data': AccountSerializer(account, many=False).data }
  return JsonResponse(res)


def deleteAccount(reqData):
  account_id = reqData.get('account_id')
  # user_id = reqData.get('account_id')

  account = get_object_or_404(Account, pk=account_id)
  account.delete()
  res = { 'ok': True, 'data': account_id }
  return JsonResponse(res)
