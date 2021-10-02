
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import BankSerializer
from api.models import BankGroup, Bank
import json


def deleteBankGroup(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  bank_group_id = reqData.get('bank_group_id')

  banks = Bank.objects.filter(user=user_id, group=bank_group_id)
  for k in banks:
    setattr(k, 'group_id', None)
  categoriesSerialized = BankSerializer(banks, many=True).data

  bankGroup = get_object_or_404(BankGroup, pk=bank_group_id)
  bankGroup.delete()

  res = { 'ok': True, 'data': { 'id': bank_group_id, 'items': categoriesSerialized } }
  return JsonResponse(res)
