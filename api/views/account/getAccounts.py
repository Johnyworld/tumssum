from api.models import Account
from api.utils.serializers import AccountSerializer
from django.http.response import JsonResponse


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
  