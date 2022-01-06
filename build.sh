#!/bin/bash


echo "*** ⛔  Stopping NginX and uWSGI... ***"
sudo systemctl stop uwsgi nginx

echo "*** 🛠   Building a client app... ***"
cd /home/ubuntu/tumssum/client && npm run build

echo "*** 🗃   Collecting static files... ***"
sudo rm -rf /static
. /home/ubuntu/tumssum/server/venv/bin/activate
cd /home/ubuntu/tumssum/server && python3 manage.py collectstatic --settings=server.settings.prod

echo "*** 🚀  Starting NginX and uWSGI ***"
sudo systemctl start uwsgi nginx

echo "*** ✅  Success!! ***"
