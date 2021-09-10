from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import CategorySerializer
from api.models import Category
import json


def putCategory(request):

  reqData = json.loads(request.body)

  category_id = reqData.get('category_id')

  category = get_object_or_404(Category, pk=category_id)
  for k in reqData:
    setattr(category, k, reqData[k])
  category.save()

  res = { 'ok': True, 'data': CategorySerializer(category, many=False).data }
  return JsonResponse(res)
