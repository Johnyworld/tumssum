from django.http.response import JsonResponse
from api.utils.serializers import AccountSerializer, MonthSerializer
from ..models import Account, Month


def getMonth(request):
  user_id = request.GET.get('user_id')
  date = request.GET.get('date')
  year = date[:4]

  month = Month.objects.filter(user_id=user_id, date__startswith=year)
  monthData = MonthSerializer(month, many=True).data
  
  res = { 'ok': True, 'data': monthData }
  return JsonResponse(res)
