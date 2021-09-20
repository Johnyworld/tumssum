from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import CategorySerializer
from api.models import Category
import requests
import json


def putCategory(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  category_id = reqData.get('category_id')
  title = reqData.get('title')
  group_id = reqData.get('group_id')
  budget = reqData.get('budget')
  date = reqData.get('date')

  budgetData = {
    'user_id': user_id,
    'category_id': category_id,
    'date': date,
    'budget': budget,
  }
  budgetItem = requests.post(
    'http://127.0.0.1:8000/api/budget/', json=budgetData, headers=request.headers)
  print('===== budgetItem:', budgetItem)

  category = get_object_or_404(Category, pk=category_id)
  category.title = title
  category.group_id = group_id
  category.save()

  res = { 'ok': True, 'data': CategorySerializer(category, many=False).data }
  return JsonResponse(res)
