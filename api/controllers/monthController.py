from django.http.response import JsonResponse
import requests
from api.utils.serializers import MonthSerializer
from ..models import Month


def getMonth(request):
  user_id = request.GET.get('user_id')
  date = request.GET.get('date')
  year = date[:4]

  months = Month.objects.filter(user_id=user_id, date__startswith=year)
  monthsData = MonthSerializer(months, many=True).data
  
  res = { 'ok': True, 'data': monthsData }
  return JsonResponse(res)


def postMonth(reqData):
  print(reqData)
  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank_id')
  date = reqData.get('date')

  month = Month(user_id=user_id, date=date, bank_id=bank_id, balance=0, carry_over=0)
  month.save()

  res = { 'ok': True, 'data': MonthSerializer(month, many=False).data }
  return JsonResponse(res)

