#! /bin/bash

CONF="-f ./docker/cloud-dev.docker-compose.yml -f ./docker/integration.docker-compose.yml -p growbe_integration"

CONF_CLOUD="-f ./docker/cloud-dev.docker-compose.yml -p growbe_cloud"

if [ -z "$VERSION" ]
then
  export VERSION=$(curl https://api.growbe.ca/explorer/openapi.json -s | jq '.info.version' -r)
fi

function start() {
  docker-compose $CONF up -d pgsql broker mongo sso $@

  echo "Waiting for migration to be over"
  sleep 5

  . ./docker/envs/local.sh
        
  if [ -n "$1" ]; then
    ./transactional/configure_db.sh integration
  fi
}

function stop() {
    docker-compose $CONF down -v
    docker-compose $CONF rm -f
}

function stop_dev() {
    docker-compose $CONF down
}

function start_backend() {
  docker-compose -f ./docker/cloud-dev.docker-compose.yml -p growbe_cloud up -d pgsql broker mongo sso growbe-cloud growbe-cloud-watcher reverse-proxy

}

function test() {
  start && \
  cd growbe-cloud && npm ci && npm run build && node ./dist/migrate.js && (cd .. && ./transactional/configure_db.sh integration) && npm run test
}

command=$1; shift;
case "$command" in
    "start") start growbe-cloud;;
    "start_dev") start growbe-cloud reverseproxy "$@";;
    "cloud") docker-compose $CONF_CLOUD up -d pgsql broker mongo sso growbe-cloud growbe-cloud-watcher reverseproxy;;
    "cloud_exec") docker-compose $CONF_CLOUD "$@";;
    "cloud_stop") docker-compose $CONF_CLOUD down;;
    "stop") stop;;
    "stop_dev") stop_dev;;
    "test") test;;
    *) echo >&2 "Invalid option: $@"; exit 1;;
esac
