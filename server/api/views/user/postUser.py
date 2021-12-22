from rest_framework.response import Response
from api.models import User
from django.contrib.auth.hashers import make_password
from api.utils.serializers import UserSerializer
import json


def postUser(request):

  reqData = json.loads(request.body)

  email = reqData.get('email')
  password = reqData.get('password')
  name = reqData.get('name')

  try:
    User.objects.get(email = email)
    res = { 'ok': False, 'code': 'ERR_USER_DOES_EXISTS'}
    return Response(res)
  
  except User.DoesNotExist:
    newUser = User.objects.create(
      username = email,
      email = email,
      first_name = name,
      password = make_password(password),
    )
    res = { 'ok': True, 'data': UserSerializer(newUser).data }
    return Response(res)
