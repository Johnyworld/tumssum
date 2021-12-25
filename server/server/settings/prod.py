from .base import *
import environ

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()

DJANGO_DB_NAME = env("DJANGO_DB_NAME")
DJANGO_DB_USERNAME = env("DJANGO_DB_USERNAME")
DJANGO_DB_PASSWORD = env("DJANGO_DB_PASSWORD")
DJANGO_DB_HOST = env("DJANGO_DB_HOST")
DJANGO_DB_PORT = env("DJANGO_DB_PORT")

SITE_ID = 3
BASE_URL = 'https://tumssum.com'
SITE_URL = 'https://tumssum.com'

DEBUG = False
ALLOWED_HOSTS = [
  '127.0.0.1',
  'localhost',
  '*.compute.amazonaws.com',
  '*.elasticbeanstalk.com',
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
