#! /bin/bash

PREFIX_CMD="docker run postgres"

echo "Running script to setup database"

psql $DB_URL -f ./transactional/growbemoduledef.sql \
    -f ./transactional/growbewarningkey.sql \
    -f ./transactional/emailtemplate.sql \
    -f ./transactional/user.sql \
    -f ./transactional/role.sql \
    -f ./transactional/userrolemapping.sql

SQL_FILE_ENV="./transactional/envs/${1}.sql"

if [ -f $SQL_FILE_ENV ]; then
    psql $DB_URL -f $SQL_FILE_ENV
fi