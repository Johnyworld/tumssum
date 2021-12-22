from django.http.response import JsonResponse
from django.conf import settings
import requests
import json


BASE_URL = settings.BASE_URL

def postAccounts(request):
	reqData = json.loads(request.body)
	headers = request.headers
	user_id = reqData.get('user_id')
	accounts = reqData.get('accounts')

	newList = []

	for account in accounts:
		account['user_id'] = user_id
		item = requests.post(BASE_URL + '/api/account/', headers=headers, json=account)
		item_json = item.json()
		newList.append(item_json['data'])

	res = { 'ok': True, 'data': newList }
	return JsonResponse(res)
