
from django.http.response import JsonResponse
from api.utils.serializers import BankSerializer
from api.models import Bank
import json


def postBank(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  bank_group_id = reqData.get('bank_group_id')
  title = reqData.get('title')
  balance = reqData.get('balance')

  newBank = Bank.objects.create(
    user_id = user_id,
    group_id = bank_group_id if bank_group_id else None,
    title = title,
    balance = balance,
  )

  res = { 'ok': True, 'data': BankSerializer(newBank, many=False).data }
  return JsonResponse(res)
