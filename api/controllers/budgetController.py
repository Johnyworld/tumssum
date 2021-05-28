from api.utils.response import ResMessage
from api.utils.serializers import getBudgetFromObject, getBudgetsFromObject
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from ..models import Budget


def getBudgets(reqData):
  user_id = reqData.get('user_id')

  budgets = Budget.objects.all().filter(user=user_id)
  return Response(getBudgetsFromObject(budgets))


def postBudget(reqData):
  user_id = reqData.get('user_id')
  category_id = reqData.get('category_id')
  budget = reqData.get('budget')
  date = reqData.get('date')

  try:
    Budget.objects.get(user_id=user_id, category_id=category_id, date=date)
  except Budget.DoesNotExist:
    newBudget = Budget(
      user_id = user_id,
      category_id = category_id,
      budget = budget,
    )
    if date is not None:
      newBudget.date = date
    newBudget.save()
    return Response(getBudgetFromObject(newBudget))
  else:
    return Response(ResMessage(None, 5001))



def putBudget(reqData):
  budget_id = reqData.get('budget_id')

  budget = get_object_or_404(Budget, pk=budget_id)
  for k in reqData:
    setattr(budget, k, reqData[k])
  budget.save()
  return Response(getBudgetFromObject(budget))


def deleteBudget(reqData):
  budget_id = reqData.get('budget_id')

  budget = get_object_or_404(Budget, pk=budget_id)
  budget.delete()
  return Response(True)