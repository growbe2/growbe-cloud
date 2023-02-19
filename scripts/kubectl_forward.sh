#! /bin/bash
#
#
#
#

export NAMESPACE=${NAMESPACE:-growbe-prod}

function forward {
        kubectl -n $NAMESPACE port-forward svc/$1 $2:$2
}

(trap 'kill 0' SIGINT; forward mongo 27018 & forward pgsql 5432)

