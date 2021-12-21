import os
from .base import *

DJANGO_DB_NAME = os.getenv("DJANGO_DB_NAME")
DJANGO_DB_USERNAME = os.getenv("DJANGO_DB_USERNAME")
DJANGO_DB_PASSWORD = os.getenv("DJANGO_DB_PASSWORD")
DJANGO_DB_HOST = os.getenv("DJANGO_DB_HOST")
DJANGO_DB_PORT = os.getenv("DJANGO_DB_PORT")

DEBUG = True
ALLOWED_HOSTS = [
  '*',
]

SITE_ID = 2
BASE_URL = 'http://localhost:8000'
SITE_URL = 'http://localhost:3000'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': DJANGO_DB_NAME,
    'USER': DJANGO_DB_USERNAME,
    'PASSWORD': DJANGO_DB_PASSWORD,
    'HOST': DJANGO_DB_HOST,
    'PORT': DJANGO_DB_PORT,
  }
}
