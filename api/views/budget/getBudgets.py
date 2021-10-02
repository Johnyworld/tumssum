from django.http.response import JsonResponse
from api.utils.serializers import BudgetSerializer
from api.models import Budget


def getBudgets(request):

	user_id = request.GET.get('user_id')
	date = request.GET.get('date')

	budgets = Budget.objects.filter(user=user_id, date=date) if date != None else Budget.objects.filter(user=user_id)

	res = { 'ok': True, 'data': BudgetSerializer(budgets, many=True).data }
	return JsonResponse(res)
