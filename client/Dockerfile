FROM node:16-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY ./ ./
ENV NODE_ENV production
RUN npm cache clean --force
RUN npm ci
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]