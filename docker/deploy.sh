#! /bin/bash

docker-compose -f ./cloud/cloud-dev.docker-compose.yml pull growbe-cloud growbe-cloud-watcher sso frontend_dev
docker-compose -f ./cloud/cloud-dev.docker-compose.yml stop
docker-compose -f ./cloud/cloud-dev.docker-compose.yml up -d
