from api.models import Month
import requests
import json


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