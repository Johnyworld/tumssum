from django.http.response import JsonResponse
from api.utils.serializers import CategoryGroupSerializer
from api.models import CategoryGroup
import json


def postCategoryGroup(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newCategoryGroup = CategoryGroup.objects.create(
    user_id = user_id,
    title = title,
  )
  res = { 'ok': True, 'data': CategoryGroupSerializer(newCategoryGroup, many=False).data }
  return JsonResponse(res)
