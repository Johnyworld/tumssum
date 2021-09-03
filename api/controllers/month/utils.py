
def getMonthsData(months):
  data = sorted(months, key=lambda month: (month['bank'], month['date']))
  totals = {}

  for month in data:
    bank_id = month['bank']

    if totals.get(bank_id):
      month['carry_over'] = totals[bank_id]
      month['balance'] = totals[bank_id] + month['expenditure']
      totals[bank_id] = totals[bank_id] + month['expenditure']
       
    else:
      month['carry_over'] = 0
      month['balance'] = month['expenditure']
      totals[bank_id] = month['expenditure']

  return data
	