from api.utils.secret import get_secret_dev
from .base import *

DJANGO_DB_NAME = get_secret_dev("DJANGO_DB_NAME")
DJANGO_DB_USERNAME = get_secret_dev("DJANGO_DB_USERNAME")
DJANGO_DB_PASSWORD = get_secret_dev("DJANGO_DB_PASSWORD")
DJANGO_DB_HOST = get_secret_dev("DJANGO_DB_HOST")
DJANGO_DB_PORT = get_secret_dev("DJANGO_DB_PORT")

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
