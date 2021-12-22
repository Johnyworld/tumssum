from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import CategoryGroupSerializer
from api.models import CategoryGroup
import json


def putCategoryGroup(request):

  reqData = json.loads(request.body)

  category_group_id = reqData.get('category_group_id')

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  for k in reqData:
    setattr(categoryGroup, k, reqData[k])
  categoryGroup.save()

  res = { 'ok': True, 'data': CategoryGroupSerializer(categoryGroup, many=False).data }
  return JsonResponse(res)
