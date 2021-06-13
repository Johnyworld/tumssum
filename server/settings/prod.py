from api.utils.secret import get_secret
from .base import *


DJANGO_DB_NAME = get_secret("DJANGO_DB_NAME")
DJANGO_DB_USERNAME = get_secret("DJANGO_DB_USERNAME")
DJANGO_DB_PASSWORD = get_secret("DJANGO_DB_PASSWORD")
DJANGO_DB_HOST = get_secret("DJANGO_DB_HOST")
DJANGO_DB_PORT = get_secret("DJANGO_DB_PORT")
DJANGO_EC2_IP = get_secret("DJANGO_EC2_IP")
DJANGO_DOMAIN = get_secret("DJANGO_DOMAIN")


DEBUG = False
ALLOWED_HOSTS = [
  '127.0.0.1',
  'localhost',
  '*.compute.amazonaws.com',
  DJANGO_EC2_IP,
  DJANGO_DOMAIN,
]


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
