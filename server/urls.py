"""tumssum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from server import settings
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.static import serve
from django.views.generic import TemplateView
from django.views.decorators.cache import cache_control
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('profile/', views.profile, name='profile'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('profile/<str:id>', views.profileDetail, name='profile-detail'),
    path('', views.index, name='index'),
    # url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.base.STATIC_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.base.STATIC_ROOT}),
    url(r'^sw.js', cache_control(max_age=2592000)(TemplateView.as_view(
        template_name='sw.js',
        content_type='application/javascript',
    )), name='sw.js'),
]
