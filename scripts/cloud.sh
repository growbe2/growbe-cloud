#! /bin/bash

PREFIX=(docker-compose -f ./docker/cloud-dev.docker-compose.yml)

case "$1" in
    "start") "${PREFIX[@]}" up -d;;
    "stop") "${PREFIX[@]}" down;;
    "build") "${PREFIX[@]}" build;;
    "update") "${PREFIX[@]}" pull growbe-cloud growbe-cloud-watcher sso frontend_dev;;
    "logs") "${PREFIX[@]}" logs;;
    *) echo >&2 "Invalid option: $@"; exit 1;;
esac