from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
from django.utils import timezone
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


def deleteUser(reqData):
  user = get_object_or_404(User, pk=reqData['id'])
  user.is_deleted = True
  user.deleted_at = timezone.now()
  user.save()
  return Response(True)


def postUser(reqData):
  newUser = User(
    email = reqData.get('email'),
    password = reqData.get('password'),
    username = reqData.get('username'),
  )
  newUser.save()
  return Response(newUser.id)