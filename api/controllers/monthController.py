from api.utils.serializers import AccountSerializer, MonthSerializer
from rest_framework.response import Response
from ..models import Account, Month


def getMonth(reqData):
  user_id = reqData.get('user_id')
  date = reqData.get('date')

  month = Month.objects.filter(user_id=user_id, date=date)
  monthData = MonthSerializer(month, many=True).data[0]
  
  accounts = Account.objects.filter(user_id=user_id, month_id=monthData.get('id'))
  accountsData = AccountSerializer(accounts, many=True).data

  total_account = 0;
  for account in accountsData:
    total_account += account.get('account')

  balance = monthData.get('carry_over') - total_account;

  merge = dict(monthData)
  merge.update({
    'accounts': accountsData,
    'total_account': total_account,
    'balance': balance
  })

  return Response(merge)
