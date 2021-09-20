from django.http.response import JsonResponse
from api.utils.serializers import BudgetSerializer
from api.utils.response import ResMessage
from api.models import Budget
import json


def postBudget(request):
  
  reqData = json.loads(request.body)

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
    res = { 'ok': True, 'data': BudgetSerializer(newBudget, many=False).data }
    return JsonResponse(res) 
  else:
    res = { 'ok': False, 'data': ResMessage(None, 5001) }
    return JsonResponse(res)
