from api.utils.response import ResMessage
from api.utils.serializers import BudgetSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from ..models import Budget


def getBudgets(reqData):
  user_id = reqData.get('user_id')
  date = reqData.get('date')

  budgets = Budget.objects.filter(user=user_id, date=date) if date != None else Budget.objects.filter(user=user_id)
  return Response(BudgetSerializer(budgets, many=True).data)


def postBudget(reqData):
  user_id = reqData.get('user_id')
  category_id = reqData.get('category_id')
  budget = reqData.get('budget')
  date = reqData.get('date') if reqData.get('date') != None else 'BASE'

  exists = Budget.objects.filter(user_id=user_id, category_id=category_id, date=date).exists()
  if exists == False:
    newBudget = Budget(
      user_id = user_id,
      category_id = category_id,
      budget = budget,
      date = date,
    )
    newBudget.save()
    return Response(BudgetSerializer(newBudget, many=False).data)
  else:
    return Response(ResMessage(None, 5001))


def putBudget(reqData):
  budget_id = reqData.get('budget_id')

  budget = get_object_or_404(Budget, pk=budget_id)
  for k in reqData:
    setattr(budget, k, reqData[k])
  budget.save()
  return Response(BudgetSerializer(budget, many=False).data)


def deleteBudget(reqData):
  budget_id = reqData.get('budget_id')

  budget = get_object_or_404(Budget, pk=budget_id)
  budget.delete()
  return Response(True)
