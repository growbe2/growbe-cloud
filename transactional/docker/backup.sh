#! /bin/bash
DB_URL="$DB_URL"
MONGO_URL="$MONGO_URL"

ROOT_FOLDER="${ROOT_FOLDER:-/backups/}"
BACKUP_NAME=$(date "+%F-%H-%M-%S")

FOLDER="${ROOT_FOLDER}/${BACKUP_NAME}"

mkdir -p ${FOLDER}

pg_dump "$DB_URL" > "${FOLDER}/pgsql.sql"
mongodump --uri="$MONGO_URL" --archive > "${FOLDER}/mongo.dump"