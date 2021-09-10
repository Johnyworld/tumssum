from django.http.response import JsonResponse
from api.utils.serializers import CategoryGroupSerializer, CategorySerializer
from api.models import Category, CategoryGroup


def getCategories(request):

  user_id = request.GET.get('user_id')

  groups = CategoryGroup.objects.filter(user=user_id)
  categories = Category.objects.filter(user=user_id)

  groupsData = CategoryGroupSerializer(groups, many=True).data
  categoriesData = CategorySerializer(categories, many=True).data

  data = {
    'groups': groupsData,
    'categories': categoriesData
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)
