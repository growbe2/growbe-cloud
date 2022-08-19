#! /bin/bash

# VERSION

envsubst < ./docker/migration.Dockerfile | DOCKER_BUILDKIT=0 docker build -t ghcr.io/growbe2/growbe-cloud/migrate:${VERSION} ./ -f - && \
docker push ghcr.io/growbe2/growbe-cloud/migrate:${VERSION}