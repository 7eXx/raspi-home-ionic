# ----------------------
# build from source
# ----------------------
FROM node:18 as build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
RUN npm run build:production

# ---------------------
# run with nginx
# ---------------------
FROM nginx:stable

COPY --from=build /app/www/* /var/www/html/*

COPY docker/nginx/etc/conf.d/default.conf /etc/nginx/conf.d/default.conf

ENV SERVER_NAME="app.texhome.lan"
ENV BACKEND_URL="backend.raspi-home:5000"
ENV MOSQUITTO_URL="mosquitto.raspi-home:9001"

COPY docker/nginx/docker-entrypoint.d/setup-environment.sh /docker-entrypoint.d/setup-environment.sh
RUN chmod +x /docker-entrypoint.d/setup-environment.sh

EXPOSE 80
EXPOSE 443

