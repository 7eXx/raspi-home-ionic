# ----------------------
# build from source
# ----------------------
FROM node:18 as build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
RUN npm run build

# ---------------------
# run with nginx
# ---------------------
FROM nginx:stable

COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80

