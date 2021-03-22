#! /bin/bash

case "$1" in

    "pg-backup")
    [ -z "$2" ] && { echo "No env specify"; exit 1; }
    . ./docker/envs/${2}.sh
    mkdir -p ./backups/
    file=backups/$2_pg_$(date "+%F-%H-%M-%S").sql
    docker run -i postgres /usr/bin/pg_dump $DB_URL > $file
    echo "pg backup is over $file";;

    "pg-restore")
    [ -z "$2" ] && { echo "No env specify"; exit 1; }
    [ -z "$3" ] && { echo "No file specify"; exit 1; }
    . ./docker/envs/${2}.sh
    cat $3 |docker run -i postgres /usr/bin/psql "$DB_URL"
    echo "pg restore is over $file";;

    "mongo-backup")
    [ -z "$2" ] && { echo "No env specify"; exit 1; }
    . ./docker/envs/${2}.sh
    file=backups/$2_mongo_$(date "+%F-%H-%M-%S").dump
    docker run -i mongo /usr/bin/mongodump "$MONGO_URL" --archive > $file
    echo "mongo backup is over $file";;

    "mongo-restore")
    [ -z "$2" ] && { echo "No env specify"; exit 1; }
    [ -z "$3" ] && { echo "No file specify"; exit 1; }
    . ./docker/envs/${2}.sh
    docker run -i mongo /usr/bin/mongorestore "$MONGO_URL" --archive < $3
    echo "mongo restore is over $file";;
    *) exit 1;;

esac
