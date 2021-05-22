from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.models import User
import json


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