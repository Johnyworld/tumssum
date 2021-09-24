from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from .bank.getBanks import getBanks
from .bank.postBank import postBank
from .bank.putBank import putBank
from .bank.deleteBank import deleteBank
from .bank.postBankGroup import postBankGroup
from .bank.putBankGroup import putBankGroup
from .bank.deleteBankGroup import deleteBankGroup


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def banks(request):
  if request.method == 'GET':
    return getBanks(request)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def bank(request):
  if request.method == 'POST':
    return postBank(request)

  elif request.method == 'PUT':
    return putBank(request)

  elif request.method == 'DELETE':
    return deleteBank(request)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def bankGroup(request):
  if request.method == 'POST':
    return postBankGroup(request)

  elif request.method == 'PUT':
    return putBankGroup(request)

  elif request.method == 'DELETE':
    return deleteBankGroup(request)
