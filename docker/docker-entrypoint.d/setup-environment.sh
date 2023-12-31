#!/bin/sh

#
# Use "," instead of "/" to avoid conflicts with url stirings
#
sed -e "s,#{__server_name__},${SERVER_NAME},g" \
    -e "s,#{__backend_url__},${BACKEND_URL},g" \
    -e "s,#{__mosquitto_url__},${MOSQUITTO_URL},g" \
    -i /etc/nginx/conf.d/default.conf
