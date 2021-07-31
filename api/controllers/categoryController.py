from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import CategoryGroupSerializer, CategorySerializer
from rest_framework.response import Response
from api.models import Category, CategoryGroup


def getCategories(request):
  user_id = request.GET.get('user_id')
  print(user_id)

  categoryGroups = CategoryGroup.objects.filter(user=user_id)
  categoriesNoGroup = Category.objects.filter(user=user_id, group=None)

  categoryGroupsData = CategoryGroupSerializer(categoryGroups, many=True).data
  categoriesNoGroupData = CategorySerializer(categoriesNoGroup, many=True).data

  merge = list(categoryGroupsData)
  merge.append({ 'categories': categoriesNoGroupData })

  res = { 'ok': True, 'data': merge }
  return JsonResponse(res)


def postCategory(reqData):
  user_id = reqData.get('user_id')
  category_group_id = reqData.get('category_group_id')
  title = reqData.get('title')

  newCategory = Category.objects.create(
    user_id = user_id,
    group_id = category_group_id if category_group_id else None,
    title = title,
  )
  return Response(CategorySerializer(newCategory, many=False).data)


def putCategory(reqData):
  category_id = reqData.get('category_id')
  print('=====', category_id)

  category = get_object_or_404(Category, pk=category_id)
  for k in reqData:
    setattr(category, k, reqData[k])
  category.save()
  res = { 'ok': True, 'data': CategorySerializer(category, many=False).data }
  return JsonResponse(res)


def deleteCategory(reqData):
  category_id = reqData.get('category_id')

  category = get_object_or_404(Category, pk=category_id)
  category.delete()
  return Response(True)


def postCategoryGroup(reqData):
  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newCategoryGroup = CategoryGroup.objects.create(
    user_id = user_id,
    title = title,
  )
  return Response(CategoryGroupSerializer(newCategoryGroup, many=False).data)


def putCategoryGroup(reqData):
  category_group_id = reqData.get('category_group_id')

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  for k in reqData:
    setattr(categoryGroup, k, reqData[k])
  categoryGroup.save()
  return Response(CategoryGroupSerializer(categoryGroup, many=False).data)


def deleteCategoryGroup(reqData):
  category_group_id = reqData.get('category_group_id')

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  categoryGroup.delete()
  return Response(True)
