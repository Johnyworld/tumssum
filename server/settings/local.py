from .base import *

DEBUG = True
ALLOWED_HOSTS = [
  '*',
]

SITE_URL = 'http://localhost:3000'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'tumssum',
    'USER': 'root',
    'PASSWORD': '',
    'HOST': '127.0.0.1',
    'PORT': '3306',
  }
}
