from django.urls import path
from . import views

urlpatterns = [
  path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('login/send/', views.sendEmail, name='send_email'),
  path('login/kakao/', views.kakao_callback, name='kakao_login'),
  path('login/kakao/finish/', views.KakaoLogin.as_view(), name='kakao_finish'),
  path('register/', views.register, name='register'),

  path('user/', views.user, name='user'),
  path('users/', views.users, name='users'),

  path('categories/', views.categories, name='categories'),
  path('category/', views.category, name='category'),
  path('category-group/', views.categoryGroup, name='categoryGroup'),

  path('banks/', views.banks, name='banks'),
  path('bank/', views.bank, name='bank'),
  path('bank-group/', views.bankGroup, name='bankGroup'),

  path('month/', views.month, name='month'),

  path('budgets/', views.budgets, name='budgets'),
  path('budget/', views.budget, name='budget'),

  path('accounts/', views.accounts, name='accounts'),
  path('account/', views.account, name='account'),
]
