from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.models import Category
import json


def deleteCategory(request):

  reqData = json.loads(request.body)

  category_id = reqData.get('category_id')

  category = get_object_or_404(Category, pk=category_id)
  category.delete()

  res = { 'ok': True, 'data': category_id }
  return JsonResponse(res)
	