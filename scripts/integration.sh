#! /bin/bash

CONF="-f ./docker/cloud-dev.docker-compose.yml -f ./docker/integration.docker-compose.yml -p growbe_integration"

function start() {
  docker-compose $CONF up -d pgsql broker mongo sso $1

  echo "Waiting for migration to be over"
  sleep 30

  . ./docker/envs/local.sh
        
  if [ -n "$1" ]; then
    ./transactional/configure_db.sh integration
  fi
}

function stop() {
    docker-compose $CONF down -v
    docker-compose $CONF rm -f
}

function test() {
  start && \
  cd growbe-cloud && npm ci && npm run build && node ./dist/migrate.js && (cd .. && ./transactional/configure_db.sh integration) && npm run test
}

case "$1" in
    "start") start growbe-cloud;;
    "stop") stop;;
    "test") test;;
    *) echo >&2 "Invalid option: $@"; exit 1;;
esac

