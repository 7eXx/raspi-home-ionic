# ----------------------
# build from source
# ----------------------
FROM --platform=linux/amd64 node:18 as build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
RUN npm run build:production

# ---------------------
# run with nginx
# ---------------------
FROM --platform=${TARGETPLATFORM:-linux/amd64} nginx:stable

COPY --from=build /app/www /var/www/html

COPY docker/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

ENV SERVER_NAME="app.texhome.lan"
ENV BACKEND_URL="http://backend.raspi-home:5000"
ENV MOSQUITTO_URL="http://mosquitto.raspi-home:9001"

COPY docker/docker-entrypoint.d/setup-environment.sh /docker-entrypoint.d/setup-environment.sh
RUN chmod +x /docker-entrypoint.d/setup-environment.sh

EXPOSE 80
EXPOSE 443
