from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.models import Account
import json


def deleteAccount(request):
  reqData = json.loads(request.body)

  account_id = reqData.get('account_id')
  # user_id = reqData.get('account_id')

  account = get_object_or_404(Account, pk=account_id)
  account.delete()
  res = { 'ok': True, 'data': account_id }
  return JsonResponse(res)
	