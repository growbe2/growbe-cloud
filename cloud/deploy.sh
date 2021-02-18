#! /bin/bash

docker-compose -f ./cloud/cloud-dev.docker-compose.yml -f ./cloud/prod.docker-compose.override.yml stop
docker-compose -f ./cloud/cloud-dev.docker-compose.yml -f ./cloud/prod.docker-compose.override.yml up -d
