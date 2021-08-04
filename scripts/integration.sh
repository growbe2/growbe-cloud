#! /bin/bash


function start() {
  docker-compose -f ./docker/cloud-dev.docker-compose.yml -f ./docker/integration.docker-compose.yml -p growbe_integration up -d pgsql broker mongo growbe-cloud sso

  echo "Waiting for migration to be over"
  sleep 10

  . ./docker/envs/local.sh

  ./transactional/configure_db.sh
}

function stop() {
    docker-compose -f ./docker/cloud-dev.docker-compose.yml -p growbe_integration down
    docker-compose -f ./docker/cloud-dev.docker-compose.yml -p growbe_integration rm -f
}


function test() {
  stop && start && \
  docker-compose -f ./docker/cloud-dev.docker-compose.yml -f ./docker/integration-test.docker-compose.yml -p growbe_integration run growbe-cloud && \
  stop
}

case "$1" in
    "start") start;;
    "stop") stop;;
    "test") test;;
    *) echo >&2 "Invalid option: $@"; exit 1;;
esac

