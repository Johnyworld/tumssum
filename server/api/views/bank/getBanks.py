from django.http.response import JsonResponse
from api.utils.serializers import BankGroupSerializer, BankSerializer
from api.models import BankGroup, Bank


def getBanks(request):
  user_id = request.GET.get('user_id')

  groups = BankGroup.objects.filter(user=user_id)
  banks = Bank.objects.filter(user=user_id)

  groupsData = BankGroupSerializer(groups, many=True).data
  banksData = BankSerializer(banks, many=True).data

  data = {
    'groups': groupsData,
    'banks': banksData
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
