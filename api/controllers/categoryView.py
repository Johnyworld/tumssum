from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from .category.getCategories import getCategories
from .category.postCategory import postCategory
from .category.putCategory import putCategory
from .category.patchCategory import patchCategory
from .category.deleteCategory import deleteCategory
from .category.postCategoryGroup import postCategoryGroup
from .category.putCategoryGroup import putCategoryGroup
from .category.deleteCategoryGroup import deleteCategoryGroup


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categories(request):
  if request.method == 'GET':
    return getCategories(request)


@api_view(['POST', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def category(request):
  if request.method == 'POST':
    return postCategory(request)

  elif request.method == 'PUT':
    return putCategory(request)

  elif request.method == 'PATCH':
    return patchCategory(request)

  elif request.method == 'DELETE':
    return deleteCategory(request)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def categoryGroup(request):
  if request.method == 'POST':
    return postCategoryGroup(request)

  elif request.method == 'PUT':
    return putCategoryGroup(request)

  elif request.method == 'DELETE':
    return deleteCategoryGroup(request)
