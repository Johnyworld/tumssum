from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .user.getUsers import getUsers
from .user.getUser import getUser
from .user.postUser import postUser
from .user.putUser import putUser
from .user.deleteUser import deleteUser


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
  if request.method == 'GET':
    return getUsers()


@api_view(['POST'])
def register(request):
  if request.method == 'POST':
    return postUser(request)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user(request):
  if request.method == 'GET':
    return getUser(request)

  elif request.method == 'PUT':
    return putUser(request)

  elif request.method == 'DELETE':
    return deleteUser(request)

