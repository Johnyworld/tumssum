from django.http.response import JsonResponse
from api.utils.serializers import MonthSerializer
from api.models import Month
import json


def postMonth(request):
  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank_id')
  date = reqData.get('date')
  expenditure = reqData.get('expenditure')

  month = Month(user_id=user_id, date=date, bank_id=bank_id, expenditure=expenditure)
  month.save()

  res = { 'ok': True, 'data': MonthSerializer(month, many=False).data }
  return JsonResponse(res)
