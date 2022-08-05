#! /bin/bash

docker build ./docker/. --tag ghcr.io/growbe2/growbe-cloud/growbe-cloud/protoc:latest && \
    docker push ghcr.io/growbe2/growbe-cloud/growbe-cloud/protoc:latest