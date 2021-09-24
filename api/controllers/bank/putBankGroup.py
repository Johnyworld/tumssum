
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import BankGroupSerializer
from api.models import BankGroup
import json


def putBankGroup(request):

  reqData = json.loads(request.body)

  bank_group_id = reqData.get('bank_group_id')

  bankGroup = get_object_or_404(BankGroup, pk=bank_group_id)
  for k in reqData:
    setattr(bankGroup, k, reqData[k])
  bankGroup.save()

  res = { 'ok': True, 'data': BankGroupSerializer(bankGroup, many=False).data }
  return JsonResponse(res)
