from django.shortcuts import get_object_or_404
from api.utils import getCategoriesJsonFromObject, getCategoryGroupJsonFromObject, getCategoryJsonFromObject
from rest_framework.response import Response
from api.models import Category, CategoryGroup


def getCategories(reqData):
  user_id = reqData.get('user_id')

  results = []
  categoryGroups = CategoryGroup.objects.filter(user=user_id)
  for categoryGroup in categoryGroups:
    categories = Category.objects.filter(user=user_id, group=categoryGroup.id)
    results.append(
      getCategoryGroupJsonFromObject(categoryGroup, categories)
    )
  categoriesHasNotGroups = Category.objects.filter(user=user_id, group=None)
  results.append({
    'categories': getCategoriesJsonFromObject(categoriesHasNotGroups)
  })
  return Response(results)


def postCategory(reqData):
  user_id = reqData.get('user_id')
  category_group_id = reqData.get('category_group_id')
  title = reqData.get('title')

  newCategory = Category(
    user_id = user_id,
    group_id = category_group_id if category_group_id else None,
    title = title,
  )
  newCategory.save()
  return Response(newCategory.id)


def putCategory(reqData):
  category_id = reqData.get('category_id')

  category = get_object_or_404(Category, pk=category_id)
  for k in reqData:
    setattr(category, k, reqData[k])
  category.save()
  return Response(getCategoryJsonFromObject(category))


def deleteCategory(reqData):
  category_id = reqData.get('category_id')

  category = get_object_or_404(Category, pk=category_id)
  category.delete()
  return Response(True)


def postCategoryGroup(reqData):
  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newCategoryGroup = CategoryGroup(
    user_id = user_id,
    title = title,
  )
  newCategoryGroup.save()
  return Response(getCategoryGroupJsonFromObject(newCategoryGroup))


def putCategoryGroup(reqData):
  category_group_id = reqData.get('category_group_id')

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  for k in reqData:
    setattr(categoryGroup, k, reqData[k])
  categoryGroup.save()
  return Response(getCategoryGroupJsonFromObject(categoryGroup))


def deleteCategoryGroup(reqData):
  category_group_id = reqData.get('category_group_id')

  categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  categoryGroup.delete()
  return Response(True)
