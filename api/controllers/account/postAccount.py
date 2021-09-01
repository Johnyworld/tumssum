from api.models import Account, Month
from api.utils.serializers import AccountSerializer
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
