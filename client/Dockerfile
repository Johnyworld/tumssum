FROM node:14.17-alpine
ENV NODE_ENV=production
ENV PARCEL_WORKERS=1
WORKDIR /usr/src/app
COPY package.json .
RUN npm install -g parcel-bundler
RUN npm install --silent
COPY . .
CMD ["npm", "run", "build"]
