FROM node:14.14-alpine as builder
ENV NODE_ENV=production
ENV PARCEL_WORKERS=1
WORKDIR /usr/src/app/client
COPY client/package.json .
RUN npm install -g parcel-bundler
RUN npm install
COPY client .
RUN npm run build

FROM python:3.9
WORKDIR /usr/src/app
COPY server/requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip3 install uwsgi
RUN mkdir -p /var/log/uwsgi
COPY server .
COPY --from=builder /usr/src/app/client/build /usr/src/app/client/build
RUN python3 manage.py collectstatic --settings=server.settings.prod
CMD ["uwsgi", "--ini", "uwsgi.ini"]
EXPOSE 8000
