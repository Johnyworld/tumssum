from rest_framework.decorators import api_view
from rest_framework.response import Response
from .controllers import userController
import json

@api_view(['GET'])
def users(request):
  if request.method == 'GET':
    return userController.getUsers()


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return userController.getUser(reqData)

  elif request.method == 'POST':
    return userController.postUser(reqData)

  elif request.method == 'PUT':
    return userController.putUser(reqData)

  elif request.method == 'DELETE':
    return Response('remove user!' + id)
