from django.http.response import JsonResponse
from api.utils.serializers import MonthSerializer
from ..models import Month


def getMonthsData(months):
  data = sorted(months, key=lambda month: (month['bank'], month['date']))
  totals = {}

  for month in data:
    bank_id = month['bank']

    if totals.get(bank_id):
      month['carry_over'] = totals[bank_id]
      month['balance'] = totals[bank_id] + month['expenditure']
      totals[bank_id] = totals[bank_id] + month['expenditure']
       
    else:
      month['carry_over'] = 0
      month['balance'] = month['expenditure']
      totals[bank_id] = month['expenditure']

  return data


def getMonth(request):
  user_id = request.GET.get('user_id')
  date = request.GET.get('date')
  year = date[:4]

  months = Month.objects.filter(user_id=user_id, date__startswith=year)
  monthsData = MonthSerializer(months, many=True).data

  data = getMonthsData(monthsData)
  
  res = { 'ok': True, 'data': data }
  return JsonResponse(res)


def postMonth(reqData):
  print(reqData)
  user_id = reqData.get('user_id')
  bank_id = reqData.get('bank_id')
  date = reqData.get('date')
  expenditure = reqData.get('expenditure')

  month = Month(user_id=user_id, date=date, bank_id=bank_id, expenditure=expenditure)
  month.save()

  res = { 'ok': True, 'data': MonthSerializer(month, many=False).data }
  return JsonResponse(res)

