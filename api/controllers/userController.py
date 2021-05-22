from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
from ..utils import getUserJsonFromObject


def getUsers():
  arr = []
  users = User.objects.all()
  for user in users:
    arr.append(getUserJsonFromObject(user))
  return Response(arr)


def getUser(reqData):
  user = get_object_or_404(User, pk=reqData['id'])
  return Response(getUserJsonFromObject(user))


def putUser(reqData):
  user = get_object_or_404(User, pk=reqData['id'])
  for k in reqData:
    setattr(user, k, reqData[k])
  user.save()
  return Response(getUserJsonFromObject(user))


def postUser(reqData):
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