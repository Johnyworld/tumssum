from api.utils import getCategoriesJsonFromObject, getCategoryGroupJsonFromObject
from rest_framework.response import Response
from api.models import Category, CategoryGroup


def getCategories(reqData):
  categoryGroupArr = []
  categoryGroups = CategoryGroup.objects.filter(user=reqData['id'])
  for categoryGroup in categoryGroups:
    categories = Category.objects.filter(user=reqData['id'], group=categoryGroup.id)
    categoryGroupArr.append(
      getCategoryGroupJsonFromObject(categoryGroup, categories)
    )
  categoriesHasNotGroups = Category.objects.filter(user=reqData['id'], group=None)
  categoryGroupArr.append({
    'categories': getCategoriesJsonFromObject(categoriesHasNotGroups)
  })
  return Response(categoryGroupArr)


def postCategory(reqData):
  return Response('post category')


def putCategory(reqData):
  return Response('put category')


def deleteCategory(reqData):
  return Response('delete category')


def postCategoryGroup(reqData):
  return Response('post category group')


def putCategoryGroup(reqData):
  return Response('put category group')


def deleteCategoryGroup(reqData):
  return Response('delete category group')