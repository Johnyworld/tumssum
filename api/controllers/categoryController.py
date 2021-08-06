from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
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


def postCategory(reqData):
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


def putCategory(reqData):
  category_id = reqData.get('category_id')

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

  res = { 'ok': True, 'data': category_id }
  return JsonResponse(res)


def postCategoryGroup(reqData):
  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newCategoryGroup = CategoryGroup.objects.create(
    user_id = user_id,
    title = title,
  )
  res = { 'ok': True, 'data': CategoryGroupSerializer(newCategoryGroup, many=False).data }
  return JsonResponse(res)


def putCategoryGroup(reqData):
  category_group_id = reqData.get('category_group_id')

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  for k in reqData:
    setattr(categoryGroup, k, reqData[k])
  categoryGroup.save()

  res = { 'ok': True, 'data': CategoryGroupSerializer(categoryGroup, many=False).data }
  return JsonResponse(res)


def deleteCategoryGroup(reqData):
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
