from django.http.response import JsonResponse
from api.utils.serializers import BudgetSerializer
from api.models import Budget
import json


def postBudget(request):
  
  reqData = json.loads(request.body)

  user_id = reqData.get('user_id')
  category_id = reqData.get('category_id')
  budget = reqData.get('budget')
  date = reqData.get('date')

  try:
    budgetItem = Budget.objects.get(user_id=user_id, category_id=category_id, date=date)
    if (budget == None):
      budgetItem.delete()
      res = { 'ok': True, 'data': None }
      return JsonResponse(res) 

    else:
      for k in reqData:
        setattr(budgetItem, k, reqData[k])
      budgetItem.save()
      res = { 'ok': True, 'data': BudgetSerializer(budget, many=False).data }
      return JsonResponse(res) 

  except Budget.DoesNotExist:
    budgetItem = Budget(
      user_id = user_id,
      category_id = category_id,
      budget = budget,
      date = date,
    )
    budgetItem.save()
    res = { 'ok': True, 'data': BudgetSerializer(budgetItem, many=False).data }
    return JsonResponse(res) 
