# TODO remove unnecessary files from image
FROM node:16
WORKDIR /app
COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .
CMD [ "node", "server.js" ]