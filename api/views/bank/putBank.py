
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import BankSerializer
from api.models import Bank
import json


def putBank(request):

  reqData = json.loads(request.body)

  bank_id = reqData.get('bank_id')

  bank = get_object_or_404(Bank, pk=bank_id)
  for k in reqData:
    setattr(bank, k, reqData[k])
  bank.save()

  res = { 'ok': True, 'data': BankSerializer(bank, many=False).data }
  return JsonResponse(res)
