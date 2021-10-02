
from django.http.response import JsonResponse
from api.utils.serializers import BankGroupSerializer
from api.models import BankGroup
import json


def postBankGroup(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newBankGroup = BankGroup.objects.create(
    user_id = user_id,
    title = title,
  )

  res = { 'ok': True, 'data': BankGroupSerializer(newBankGroup, many=False).data }
  return JsonResponse(res)
