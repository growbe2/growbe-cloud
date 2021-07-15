#! /bin/bash

docker-compose -f ./docker/cloud-dev.docker-compose.yml pull growbe-cloud growbe-cloud-watcher sso frontend_dev nms
docker-compose -f ./docker/cloud-dev.docker-compose.yml stop
docker-compose -f ./docker/cloud-dev.docker-compose.yml up -d
