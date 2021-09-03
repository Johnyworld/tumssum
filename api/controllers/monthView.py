from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .month.getMonth import getMonth
from .month.postMonth import postMonth


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def months(request):
  return getMonth(request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def month(request):
  if request.method == 'POST':
    return postMonth(request)
