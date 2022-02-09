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
  memo = reqData.get('memo')
  category_group_id = reqData.get('category_group_id')
  budget = reqData.get('budget')
  date = reqData.get('yyyymm')
  res_json = None

  budgetData = {
    'user_id': user_id,
    'category_id': category_id,
    'date': date,
    'budget': budget,
  }
  res = requests.post(
    'http://127.0.0.1:8000/api/budget/', json=budgetData, headers=request.headers)
  res_json = res.json()

  category = get_object_or_404(Category, pk=category_id)
  category.title = title
  category.memo = memo
  category.group_id = category_group_id if category_group_id else None
  category.save()


  data = {
    'category': CategorySerializer(category, many=False).data,
    'budget': res_json.get('data') if res_json != None else None,
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
