from django.core.exceptions import ImproperlyConfigured
from .base import *
import json
secret_file = os.path.join(BASE_DIR, 'env.json')
with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)




DEBUG = False
ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    '3.36.125.162',
    '*.compute.amazonaws.com',
    'ec2-3-36-125-162.ap-northeast-2.compute.amazonaws.com/',
]


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DJANGO_DB_NAME = get_secret("DJANGO_DB_NAME")
DJANGO_DB_USERNAME = get_secret("DJANGO_DB_USERNAME")
DJANGO_DB_PASSWORD = get_secret("DJANGO_DB_PASSWORD")
DJANGO_DB_HOST = get_secret("DJANGO_DB_HOST")
DJANGO_DB_PORT = get_secret("DJANGO_DB_PORT")

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