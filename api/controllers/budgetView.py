from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from .budget.getBudgets import getBudgets
from .budget.postBudget import postBudget
from .budget.putBudget import putBudget


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def budgets(request):
  if request.method == 'GET':
    return getBudgets(request)

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def budget(request):
  if request.method == 'POST':
    return postBudget(request)

  elif request.method == 'PUT':
    return putBudget(request)
