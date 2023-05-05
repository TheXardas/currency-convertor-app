FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
ENV NODE_ENV production
RUN npm cache clean --force
RUN npm ci
COPY . .
CMD [ "node", "server.js" ]