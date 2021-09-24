from django.urls import path
from . import views

from .controllers import accountView, monthView, categoryView, budgetView, bankView

urlpatterns = [
  path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('login/send/', views.sendEmail, name='send_email'),
  path('login/google/', views.google_callback, name='google_login'),
  path('login/google/finish/', views.GoogleLogin.as_view(), name='google_finish'),
  path('login/kakao/', views.kakao_callback, name='kakao_login'),
  path('login/kakao/finish/', views.KakaoLogin.as_view(), name='kakao_finish'),
  path('register/', views.register, name='register'),

  path('user/', views.user, name='user'),
  path('users/', views.users, name='users'),

  path('categories/', categoryView.categories, name='categories'),
  path('category/', categoryView.category, name='category'),
  path('category-group/', categoryView.categoryGroup, name='categoryGroup'),

  path('banks/', bankView.banks, name='banks'),
  path('bank/', bankView.bank, name='bank'),
  path('bank-group/', bankView.bankGroup, name='bankGroup'),

  path('months/', monthView.months, name='months'),
  path('month/', monthView.month, name='month'),

  path('budgets/', budgetView.budgets, name='budgets'),
  path('budget/', budgetView.budget, name='budget'),

  path('accounts/', accountView.accounts, name='accounts'),
  path('account/', accountView.account, name='account'),
]
