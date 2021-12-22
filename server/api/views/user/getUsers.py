from rest_framework.response import Response
from api.models import User
from api.utils.serializers import UserSerializer


def getUsers():
  users = User.objects.all()
  return Response(UserSerializer(users, many=True).data)


	