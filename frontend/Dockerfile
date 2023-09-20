FROM node:18.16.1-alpine AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.0

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /frontend/dist .
COPY --from=build /frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

