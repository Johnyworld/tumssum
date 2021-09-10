from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import CategorySerializer
from api.models import Category, CategoryGroup
import json


def deleteCategoryGroup(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  category_group_id = reqData.get('category_group_id')

  categories = Category.objects.filter(user=user_id, group=category_group_id)
  for k in categories:
    setattr(k, 'group_id', None)
  categoriesSerialized = CategorySerializer(categories, many=True).data

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  categoryGroup.delete()

  print(categoriesSerialized)

  res = { 'ok': True, 'data': { 'id': category_group_id, 'items': categoriesSerialized } }
  return JsonResponse(res)
