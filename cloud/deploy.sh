#! /bin/bash

docker-compose -f ./cloud/cloud-dev.docker-compose.yml stop
docker-compose -f ./cloud/cloud-dev.docker-compose.yml up -d
