from django.http.response import JsonResponse
from api.utils.serializers import CategorySerializer
from api.models import Category
import json
import requests


def postCategory(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  category_group_id = reqData.get('category_group_id')
  title = reqData.get('title')
  memo = reqData.get('memo')
  budget = reqData.get('budget')
  date = reqData.get('yyyymm')

  newCategory = Category.objects.create(
    user_id = user_id,
    group_id = category_group_id if category_group_id else None,
    title = title,
    memo = memo,
  )

  budgetData = {
    'user_id': user_id,
    'category_id': newCategory.id,
    'date': date,
    'budget': budget,
  }
  res = requests.post(
    'http://127.0.0.1:8000/api/budget/', json=budgetData, headers=request.headers)
  res_json = res.json()

  data = {
    'category': CategorySerializer(newCategory, many=False).data,
    'budget': res_json.get('data') if res_json != None else None,
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
