from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import CategorySerializer
from api.models import Category
import json


def putCategory(request):

  reqData = json.loads(request.body)

  category_id = reqData.get('category_id')
  title = reqData.get('title')
  group_id = reqData.get('group_id')
  budget = reqData.get('budget')
  date = reqData.get('date')

  category = get_object_or_404(Category, pk=category_id)
  category.title = title
  category.group_id = group_id
  category.save()

  res = { 'ok': True, 'data': CategorySerializer(category, many=False).data }
  return JsonResponse(res)
