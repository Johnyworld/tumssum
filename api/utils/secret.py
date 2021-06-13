from server.settings.base import BASE_DIR
from django.core.exceptions import ImproperlyConfigured
import os
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
