FROM node:14.17-alpine as builder
ENV NODE_ENV=production
ENV PARCEL_WORKERS=1
ARG KAKAO_JS_KEY
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_EMAIL
ENV KAKAO_JS_KEY=$KAKAO_JS_KEY
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_EMAIL=$GOOGLE_CLIENT_EMAIL
WORKDIR /usr/src/app/client
COPY client/package.json .
RUN npm install -g parcel-bundler
RUN npm install --silent
COPY client .
RUN npm run build

FROM python:3.9
ENV EMAIL_HOST_USER=$EMAIL_HOST_USER
ENV EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD
ENV DJANGO_DB_HOST=$DJANGO_DB_HOST
ENV DJANGO_DB_NAME=$DJANGO_DB_NAME
ENV DJANGO_DB_USERNAME=$DJANGO_DB_USERNAME
ENV DJANGO_DB_PASSWORD=$DJANGO_DB_PASSWORD
ENV DJANGO_DB_PORT=$DJANGO_DB_PORT
ENV DJANGO_BASE_URL=$DJANGO_BASE_URL
WORKDIR /usr/src/app
COPY server/requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip3 install uwsgi
RUN mkdir -p /var/log/uwsgi
COPY server .
COPY --from=builder /usr/src/app/client/build /usr/src/app/client/build
RUN python3 manage.py collectstatic --settings=server.settings.prod
CMD ["uwsgi", "--ini", "uwsgi.ini"]
# EXPOSE 8000
