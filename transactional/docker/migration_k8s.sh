#! /bin/bash

# DB_URL , MONGO_URL , NAMESPACE , VERSION

envsubst < docker/migration-k8s.yaml | kubectl delete -n ${NAMESPACE} -f -
envsubst < docker/migration-k8s.yaml | kubectl apply -n ${NAMESPACE} -f -