from django.http.response import JsonResponse
from api.utils.serializers import MonthSerializer
from api.models import Month
from api.controllers.month.utils import getMonthsData


def getMonth(request):
  user_id = request.GET.get('user_id')
  date = request.GET.get('date')
  year = date[:4]

  months = Month.objects.filter(user_id=user_id, date__startswith=year)
  monthsData = MonthSerializer(months, many=True).data

  data = getMonthsData(monthsData)
  
  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
