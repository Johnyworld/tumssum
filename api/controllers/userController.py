from rest_framework.response import Response
from api.models import User
from ..utils import getUserJsonFromObject
import json


def getUsers(request):
  arr = []
  users = User.objects.all()
  for user in users:
    arr.append(getUserJsonFromObject(user))
  return Response(arr)


def postUser(request):
  reqData = json.loads(request.body)
  newUserId = None

  try:
    lastUser = User.objects.latest('created_at')
  except(User.DoesNotExist):
    newUserId = 1 
  except(KeyError):
    return Response('Error')
  else:
    newUserId = lastUser.id + 1
    
  newUser = User(
    id = newUserId,
    email = reqData.get('email'),
    password = reqData.get('password'),
    username = reqData.get('username'),
  )
  newUser.save()
  return Response(newUser.id)