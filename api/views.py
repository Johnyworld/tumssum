from django.contrib.auth.models import User
from django.shortcuts import redirect, resolve_url
from django.http import JsonResponse
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .utils.serializers import UserSerializerWithToken
from .controllers import userController, categoryController, bankController, budgetController, accountController, monthController
from api.utils.secret import get_secret
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount
from allauth.account.adapter import DefaultAccountAdapter
from dj_rest_auth.registration.views import SocialLoginView

# from django.conf import settings
# from allauth.socialaccount.models import SocialAccount
# from rest_framework import status
from json.decoder import JSONDecodeError

import requests
import json

REDIRECT_URI = "http://127.0.0.1:8000/api/login/kakao/callback/"
CLIENT_ID = get_secret("KAKAO_REST_KEY")

###################### AUTH ######################
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)

    serializer = UserSerializerWithToken(self.user).data

    for k, v in serializer.items():
      data[k] = v

    return data


class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer


def kakao_login(request):
  print('====')
  return redirect(
    f"https://kauth.kakao.com/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code"
  )


class KakaoLogin(SocialLoginView):
  adapter_class = kakao_view.KakaoOAuth2Adapter
  client_class = OAuth2Client
  callback_url = REDIRECT_URI



class AccountAdapter(DefaultAccountAdapter):
  def get_login_redirect_url(self, request):
    print('===== REDIRECT!')
    return '/'

def kakao_callback(request):
  print('===== KAKAO, ', request);
  code = request.GET.get("code")
  # ----------------------------------------
  # Access Token Request
  # ----------------------------------------
  access_token = requests.get(
    f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&code={code}")
  access_token_json = access_token.json()
  error = access_token_json.get("error")
  if error is not None:
    raise JSONDecodeError(error)
  access_token = access_token_json.get("access_token")
  print('===== ACC_TOKEN, ', access_token);
  # ----------------------------------------
  # Request User Informations
  # ----------------------------------------
  profile_request = requests.get(
    "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
  profile_json = profile_request.json()
  kakao_account = profile_json.get('kakao_account')
  profile = kakao_account.get('profile')
  email = kakao_account.get('email')
  nickname = profile.get('nickname')
  avatar = profile.get('profile_image_url')
  print('===== EMAIL', kakao_account, nickname, email, avatar)
  # ----------------------------------------
  # Signup or Signin Request
  # ----------------------------------------
  try:
    user = User.objects.get(email=email) # 기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인
    # 다른 SNS로 가입된 유저
    print('===== User', user) 
    social_user = SocialAccount.objects.get(user=user)
    print('===== SocialAccount', social_user) 
    if social_user is None:
      return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
    if social_user.provider != 'kakao':
      return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
    # 기존에 Google로 가입된 유저
    data = {'access_token': access_token, 'code': code}
    print('==== LOGIN!')
    accept = requests.post(
      "http://127.0.0.1:8000/api/login/kakao/finish/", data=data)
    print('===== POST DATA', data) 
    print('===== POST RES', accept) 
    accept_status = accept.status_code
    if accept_status != 200:
      return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
    accept_json = accept.json()
    accept_json.pop('user', None)
    return JsonResponse(accept_json)

  except User.DoesNotExist: # 기존에 가입된 유저가 없으면 새로 가입
    print('==== REGISTER!')
    data = {'access_token': access_token, 'code': code}
    accept = requests.post(
      "http://127.0.0.1:8000/api/login/kakao/finish/", data=data)
    print('===== POST DATA', data)
    print('===== POST RES', accept)
    accept_status = accept.status_code
    if accept_status != 200:
      return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
    # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
    accept_json = accept.json()
    accept_json.pop('user', None)
    return JsonResponse(accept_json)



###################### USER ######################
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
  if request.method == 'GET':
    return userController.getUsers()


@api_view(['POST'])
def register(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return userController.postUser(reqData)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return userController.getUser(reqData)

  elif request.method == 'PUT':
    return userController.putUser(reqData)

  elif request.method == 'DELETE':
    return userController.deleteUser(reqData)


###################### CATEGORY ######################
@api_view(['GET'])
def categories(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return categoryController.getCategories(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def category(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return categoryController.postCategory(reqData)

  elif request.method == 'PUT':
    return categoryController.putCategory(reqData)

  elif request.method == 'DELETE':
    return categoryController.deleteCategory(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def categoryGroup(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return categoryController.postCategoryGroup(reqData)

  elif request.method == 'PUT':
    return categoryController.putCategoryGroup(reqData)

  elif request.method == 'DELETE':
    return categoryController.deleteCategoryGroup(reqData)


###################### BANK ######################
@api_view(['GET'])
def banks(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return bankController.getBanks(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def bank(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return bankController.postBank(reqData)

  elif request.method == 'PUT':
    return bankController.putBank(reqData)

  elif request.method == 'DELETE':
    return bankController.deleteBank(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def bankGroup(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return bankController.postBankGroup(reqData)

  elif request.method == 'PUT':
    return bankController.putBankGroup(reqData)

  elif request.method == 'DELETE':
    return bankController.deleteBankGroup(reqData)


###################### Month ######################
@api_view(['GET'])
def month(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return monthController.getMonth(reqData)


###################### Budget ######################
@api_view(['GET'])
def budgets(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return budgetController.getBudgets(reqData)

@api_view(['POST', 'PUT', 'DELETE'])
def budget(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return budgetController.postBudget(reqData)

  elif request.method == 'PUT':
    return budgetController.putBudget(reqData)

  elif request.method == 'DELETE':
    return budgetController.deleteBudget(reqData)


###################### Budget ######################
@api_view(['GET'])
def accounts(request):
  reqData = json.loads(request.body)
  if request.method == 'GET':
    return accountController.getAccounts(reqData)


@api_view(['POST', 'PUT', 'DELETE'])
def account(request):
  reqData = json.loads(request.body)
  if request.method == 'POST':
    return accountController.postAccount(reqData)

  elif request.method == 'PUT':
    return accountController.putAccount(reqData)

  elif request.method == 'DELETE':
    return accountController.deleteAccount(reqData)
