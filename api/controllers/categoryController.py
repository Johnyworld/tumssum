from api.utils import getCategoriesJsonFromObject, getCategoryGroupJsonFromObject
from rest_framework.response import Response
from api.models import Category, CategoryGroup
import json


def getCategories(reqData):
  user_id = reqData.get('user_id')

  categoryGroupArr = []
  categoryGroups = CategoryGroup.objects.filter(user=user_id)
  for categoryGroup in categoryGroups:
    categories = Category.objects.filter(user=user_id, group=categoryGroup.id)
    categoryGroupArr.append(
      getCategoryGroupJsonFromObject(categoryGroup, categories)
    )
  categoriesHasNotGroups = Category.objects.filter(user=user_id, group=None)
  categoryGroupArr.append({
    'categories': getCategoriesJsonFromObject(categoriesHasNotGroups)
  })
  return Response(categoryGroupArr)


def postCategory(reqData):
  user_id = reqData.get('user_id')
  group_id = reqData.get('group_id')
  title = reqData.get('title')

  newCategory = Category(
    user_id = user_id,
    group_id = group_id if group_id else None,
    title = title,
  )
  newCategory.save()
  return Response(newCategory.id)


def putCategory(reqData):
  return Response('put category')


def deleteCategory(reqData):
  return Response('delete category')


def postCategoryGroup(reqData):
  user_id = reqData.get('user_id')
  group_id = reqData.get('group_id')

  newCategoryGroup = CategoryGroup(
    user_id = user_id,
    title = group_id,
  )
  newCategoryGroup.save()
  return Response('post category group')


def putCategoryGroup(reqData):
  return Response('put category group')


def deleteCategoryGroup(reqData):
  return Response('delete category group')