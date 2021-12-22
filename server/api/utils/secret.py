from django.core.exceptions import ImproperlyConfigured
import json

with open('env.json') as f:
    secrets = json.loads(f.read())

with open('env.dev.json') as f:
    secrets_dev = json.loads(f.read())

def get_secret(setting, secrets=secrets):
  try:
    return secrets[setting]
  except KeyError:
    error_msg = "Set the {} environment variable".format(setting)
    raise ImproperlyConfigured(error_msg)

def get_secret_dev(setting):
  return get_secret(setting, secrets_dev)
