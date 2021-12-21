FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app/client
COPY package.json .
RUN npm install -g parcel-bundler
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD ["npm", "build"]
