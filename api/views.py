from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .utils.serializers import UserSerializer, UserSerializerWithToken
from api.utils.secret import get_secret
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings

# from django.conf import settings
# from allauth.socialaccount.models import SocialAccount
# from rest_framework import status

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


class GoogleLogin(SocialLoginView):
  adapter_class = google_view.GoogleOAuth2Adapter
  client_class = OAuth2Client
  callback_url = REDIRECT_URI

class KakaoLogin(SocialLoginView):
  adapter_class = kakao_view.KakaoOAuth2Adapter
  client_class = OAuth2Client
  callback_url = REDIRECT_URI


def sendEmail(request):
  if request.method == 'GET':
    email = request.GET.get('email')
    try:
      # 유저가 존재할 경우 토큰 이메일 전송
      token = 'A9ffjdsdf73D'
      url = settings.SITE_URL
      user = User.objects.get(email = email)
      user.set_password(token)
      user.save()
      html_message = render_to_string('mail_template.html', { 'url': url, 'email': email, 'token': token, 'name': user.first_name})
      plain_message = strip_tags(html_message)
      send_mail(
        '틈씀이에 로그인합니다.',
        plain_message,
        'ssamgah@gmail.com',
        [email],
        fail_silently=False,
        html_message=html_message,
      )
      res = { 'ok': True, 'data': True }
      return JsonResponse(res, status=200)

    except User.DoesNotExist:
      # 유저가 존재하지 않을 경우 204 코드 전달
      res = { 'ok': False, 'code': 'ERR_USER_DOES_NOT_EXISTS' }
      return JsonResponse(res)

  elif request.method == 'POST':
    reqData = json.loads(request.body)


def google_callback(request):
  reqData = json.loads(request.body)
  email = reqData.get('email')
  name = reqData.get('name')
  access_token = reqData.get('access_token')
  try:
    user = User.objects.get(email=email) # 기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인
    # 다른 SNS로 가입된 유저
    social_user = SocialAccount.objects.get(user=user)
    if social_user is None:
      res = { 'ok': False, 'code': 'email exists but not social user' }
      return JsonResponse(res, status=status.HTTP_400_BAD_REQUEST)
    if social_user.provider != 'google':
      res = { 'ok': False, 'code': 'no matching social type' }
      return JsonResponse(res, status=status.HTTP_400_BAD_REQUEST)
    # 기존에 Google로 가입된 유저
    data = {'access_token': access_token}
    accept = requests.post(
      "http://127.0.0.1:8000/api/login/google/finish/", data=data)
    accept_status = accept.status_code
    if accept_status != 200:
      res = { 'ok': False, 'code': 'failed to signin' }
      return JsonResponse(res, status=accept_status)
    accept_json = accept.json()
    accept_json.pop('user', None)
    accept_json['access'] = accept_json.pop('access_token', None)
    accept_json['refresh'] = accept_json.pop('refresh_token', None)
    user = User.objects.get(username=email)
    res = { 'ok': True, 'data': dict(accept_json, **UserSerializer(user).data) }
    return JsonResponse(res)

  except User.DoesNotExist: # 기존에 가입된 유저가 없으면 새로 가입
    data = {'access_token': access_token}
    accept = requests.post(
      "http://127.0.0.1:8000/api/login/google/finish/", data=data)
    accept_status = accept.status_code
    if accept_status != 200:
      res = { 'ok': False, 'code': 'failed to signup' }
      return JsonResponse(res, status=accept_status)
    # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
    accept_json = accept.json()
    accept_json.pop('user', None)
    accept_json['access'] = accept_json.pop('access_token', None)
    accept_json['refresh'] = accept_json.pop('refresh_token', None)
    user = User.objects.get(username=email)
    setattr(user, 'first_name', name)
    user.save()
    res = { 'ok': True, 'data': dict(accept_json, **UserSerializer(user).data) }
    return JsonResponse(res)
    # return JsonResponse({ 'name': 'world' })



def kakao_callback(request):
  reqData = json.loads(request.body)
  access_token = reqData.get('access_token')
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
  # ----------------------------------------
  # Signup or Signin Request
  # ----------------------------------------
  try:
    user = User.objects.get(email=email) # 기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인
    # 다른 SNS로 가입된 유저
    social_user = SocialAccount.objects.get(user=user)
    if social_user is None:
      res = { 'ok': False, 'code': 'email exists but not social user' }
      return JsonResponse(res, status=status.HTTP_400_BAD_REQUEST)
    if social_user.provider != 'kakao':
      res = { 'ok': False, 'code': 'no matching social type' }
      return JsonResponse(res, status=status.HTTP_400_BAD_REQUEST)
    # 기존에 Google로 가입된 유저
    data = {'access_token': access_token}
    accept = requests.post(
      "http://127.0.0.1:8000/api/login/kakao/finish/", data=data)
    accept_status = accept.status_code
    if accept_status != 200:
      res = { 'ok': False, 'code': 'failed to signin' }
      return JsonResponse(res, status=accept_status)
    accept_json = accept.json()
    accept_json.pop('user', None)
    accept_json['access'] = accept_json.pop('access_token', None)
    accept_json['refresh'] = accept_json.pop('refresh_token', None)
    user = User.objects.get(username=email)
    res = { 'ok': True, 'data': dict(accept_json, **UserSerializer(user).data) }
    return JsonResponse(res)

  except User.DoesNotExist: # 기존에 가입된 유저가 없으면 새로 가입
    data = {'access_token': access_token}
    accept = requests.post(
      "http://127.0.0.1:8000/api/login/kakao/finish/", data=data)
    accept_status = accept.status_code
    if accept_status != 200:
      res = { 'ok': False, 'code': 'failed to signup' }
      return JsonResponse(res, status=accept_status)
    # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
    accept_json = accept.json()
    accept_json.pop('user', None)
    accept_json['access'] = accept_json.pop('access_token', None)
    accept_json['refresh'] = accept_json.pop('refresh_token', None)
    user = User.objects.get(username=email)
    setattr(user, 'first_name', nickname)
    user.save()
    res = { 'ok': True, 'data': dict(accept_json, **UserSerializer(user).data) }
    return JsonResponse(res)


