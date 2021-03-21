#! /bin/bash

docker-compose -f ./cloud/cloud-dev.docker-compose.yml build --build-arg GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN