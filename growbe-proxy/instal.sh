#! /bin/bash

## Install systemd service and the app the the filesystem

APP_FOLDER=/opt/growbe/proxy

cp ./growbe-proxy.service /lib/systemd/system/ && \
mkdir -p $APP_FOLDER && \
cp -r ./node_modules ./index.js ./config.json $APP_FOLDER