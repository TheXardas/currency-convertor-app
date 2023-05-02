# TODO Make it production build friendly: no npm start, only npm run build, static result served by nginx.
FROM node:16
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]