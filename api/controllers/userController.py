from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
from django.utils import timezone
from api.utils.getJsonFromObject import getUserJsonFromObject

def getUsers():
  arr = []
  users = User.objects.all()
  for user in users:
    arr.append(getUserJsonFromObject(user))
  return Response(arr)


def getUser(reqData):
  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  return Response(getUserJsonFromObject(user))


def putUser(reqData):
  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  for k in reqData:
    setattr(user, k, reqData[k])
  user.save()
  return Response(getUserJsonFromObject(user))


def deleteUser(reqData):
  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  user.is_deleted = True
  user.deleted_at = timezone.now()
  user.save()
  return Response(True)


def postUser(reqData):
  email = reqData.get('email')
  password = reqData.get('password')
  username = reqData.get('username')

  newUser = User(
    email = email,
    password = password,
    username = username,
  )
  newUser.save()
  return Response(getUserJsonFromObject(newUser))