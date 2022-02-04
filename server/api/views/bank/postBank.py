
from django.http.response import JsonResponse
from api.utils.serializers import BankSerializer
from api.models import Bank
import json


def postBank(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  group_id = reqData.get('group_id')
  title = reqData.get('title')
  memo = reqData.get('memo')

  newBank = Bank.objects.create(
    user_id = user_id,
    group_id = group_id if group_id else None,
    title = title,
    memo = memo,
  )

  res = { 'ok': True, 'data': BankSerializer(newBank, many=False).data }
  return JsonResponse(res)
