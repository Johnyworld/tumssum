from api.controllers.month.utils import getNewMonths
from api.models import Account, Month
from api.utils.serializers import AccountSerializer, MonthSerializer
from django.http.response import JsonResponse
import requests
import json


def postAccount(request):

  reqData = json.loads(request.body)
  headers = request.headers

  title = reqData.get('title')
  account = reqData.get('account')
  datetime = reqData.get('datetime')
  user_id = reqData.get('user_id')
  memo = reqData.get('memo') # Not Required
  location = reqData.get('location') # Not Required
  category_id = reqData.get('category_id') # Not Required
  bank_id = reqData.get('bank_id') # Not Required
  month = None
  months = None

  if (bank_id != None):
    yyyymm = datetime[:7]
    try:
      month = Month.objects.get(bank_id=bank_id, date=yyyymm)
      month.expenditure = month.expenditure + account;
      month.save()
    except:
      data = {
        'user_id': user_id,
        'bank_id': bank_id,
        'date': yyyymm,
        'expenditure': account,
      }
      requests.post("http://127.0.0.1:8000/api/month/", json=data, headers=headers)
      month = Month.objects.get(bank_id=bank_id, date=yyyymm)

    months = getNewMonths( user_id, bank_id, yyyymm, headers )


  newAccount = Account(
    title = title,
    account = account,
    datetime = datetime,
    user_id = user_id,
    memo = memo if memo != None else '',
    location = location if location != None else '',
    category_id = category_id,
    bank_id = bank_id,
    month_id = month.id if month != None else None,
  )

  newAccount.save()


  data = {
    'account': AccountSerializer(newAccount, many=False).data,
    'months': months,
  }
  

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
