#! /bin/bash


function start() {
docker-compose -f ./docker/cloud-dev.docker-compose.yml -p growbe_integration up -d pgsql broker mongo

echo "Waiting for postgresql 5432"

while ! nc -z localhost 5432; do   
  sleep 0.1 # wait for 1/10 of the second before check again
done


. ./docker/envs/local.sh

cd growbe-cloud && npm run migrate

cd ..

./transactional/configure_db.sh
}

function stop() {
    docker-compose -f ./docker/cloud-dev.docker-compose.yml -p growbe_integration down
    docker-compose -f ./docker/cloud-dev.docker-compose.yml -p growbe_integration rm -f
}

case "$1" in
    "start") start;;
    "stop") stop;;
    *) echo >&2 "Invalid option: $@"; exit 1;;
esac

