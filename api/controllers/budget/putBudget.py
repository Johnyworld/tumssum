from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import BudgetSerializer
from api.models import Budget
import json


def putBudget(request):

  reqData = json.loads(request.body)

  budget_id = reqData.get('budget_id')

  budget = get_object_or_404(Budget, pk=budget_id)
  for k in reqData:
    setattr(budget, k, reqData[k])
  budget.save()

  res = { 'ok': True, 'data': BudgetSerializer(budget, many=False).data }
  return JsonResponse(res) 
