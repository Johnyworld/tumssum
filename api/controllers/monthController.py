from django.http.response import JsonResponse
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
