from django.http.response import JsonResponse
from api.utils.serializers import CategorySerializer
from api.models import Category
import json


def postCategory(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  category_group_id = reqData.get('category_group_id')
  title = reqData.get('title')

  newCategory = Category.objects.create(
    user_id = user_id,
    group_id = category_group_id if category_group_id else None,
    title = title,
  )
  res = { 'ok': True, 'data': CategorySerializer(newCategory, many=False).data }
  return JsonResponse(res)
