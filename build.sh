sudo rm -rf /static
cd /home/ubuntu/tumssum/client && npm run build
. /home/ubuntu/tumssum/server/venv/bin/activate
cd /home/ubuntu/tumssum/server && python3 manage.py collectstatic --settings=server.settings.prod
