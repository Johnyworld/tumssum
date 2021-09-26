from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
from api.utils.serializers import UserSerializer
import json


def getUser(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  return Response(UserSerializer(user).data)