
# User
# Category
# Bank
# Month
# Budget
# Account

messages = {
  5001: '이미 존재하는 예산 정보 입니다.' 
}

def ResMessage(data, code):
  return {
    'code': code,
    'data': data,
    'message': messages[code],
  }