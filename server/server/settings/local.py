from .base import *
import environ

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()

DJANGO_DB_NAME = env('DJANGO_DB_NAME')
DJANGO_DB_USERNAME = env("DJANGO_DB_USERNAME")
DJANGO_DB_PASSWORD = env("DJANGO_DB_PASSWORD")
DJANGO_DB_HOST = env("DJANGO_DB_HOST")
DJANGO_DB_PORT = env("DJANGO_DB_PORT")
BASE_URL = env("DJANGO_BASE_URL")

DEBUG = True
ALLOWED_HOSTS = [
  '*',
]

SITE_ID = 2
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
