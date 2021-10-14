cd /home/ubuntu/tumssum/client && npm run build
. /home/ubuntu/tumssum/venv/bin/activate
cd /home/ubuntu/tumssum && python3 manage.py collectstatic --settings=server.settings.prod
