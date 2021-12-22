from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
from api.utils.serializers import UserSerializer
import json


def getUser(request):

  user_id = request.GET.get('user_id')

  user = get_object_or_404(User, pk=user_id)

  res = { 'ok': True, 'data': UserSerializer(user).data}
  return Response(res)