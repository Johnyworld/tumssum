from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from .account.getAccounts import getAccounts
from .account.postAccounts import postAccounts
from .account.postAccount import postAccount
from .account.putAccount import putAccount
from .account.patchAccount import patchAccount
from .account.deleteAccount import deleteAccount


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def accounts(request):
  if request.method == 'GET':
    return getAccounts(request)
  elif request.method == 'POST':
    return postAccounts(request)


@api_view(['POST', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def account(request):
  if request.method == 'POST':
    return postAccount(request)

  elif request.method == 'PUT':
    return putAccount(request)

  elif request.method == 'PATCH':
    return patchAccount(request)

  elif request.method == 'DELETE':
    return deleteAccount(request)
