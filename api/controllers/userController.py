from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from api.utils.serializers import UserSerializer


def getUsers():
  users = User.objects.all()
  return Response(UserSerializer(users, many=True).data)


def getUser(reqData):
  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  return Response(UserSerializer(user).data)


def putUser(reqData):
  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  for k in reqData:
    setattr(user, k, reqData[k])
  user.save()
  return Response(UserSerializer(user).data)


def deleteUser(reqData):
  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  user.is_active = False
  user.save()
  return Response(True)


def postUser(reqData):
  email = reqData.get('email')
  password = reqData.get('password')
  name = reqData.get('name')

  newUser = User.objects.create(
    username = email,
    email = email,
    first_name = name,
    password = make_password(password),
  )
  return Response(UserSerializer(newUser).data)
