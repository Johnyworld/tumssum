
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.models import Bank
import json


def deleteBank(request):

  reqData = json.loads(request.body)

  bank_id = reqData.get('bank_id')

  bank = get_object_or_404(Bank, pk=bank_id)
  bank.delete()

  res = { 'ok': True, 'data': bank_id }
  return JsonResponse(res)

