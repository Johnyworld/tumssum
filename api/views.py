from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.models import User
from .controllers import userController

@api_view(['GET', 'POST'])
def users(request):
  if request.method == 'GET':
    return userController.getUsers(request)

  elif request.method == 'POST':
    return userController.postUser(request)
    

@api_view(['GET', 'PUT', 'DELETE'])
def user(request, id):

  user = get_object_or_404(User, pk=id)

  if request.method == 'GET':
    return Response('get user detail!' + id)
  elif request.method == 'PUT':
    return Response('edit user!' + id)
  elif request.method == 'DELETE':
    return Response('remove user!' + id)
