from rest_framework.response import Response
from api.models import User
from django.shortcuts import get_object_or_404
import json


def deleteUser(request):

  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')

  user = get_object_or_404(User, pk=user_id)
  user.is_active = False
  user.save()
  return Response(True)