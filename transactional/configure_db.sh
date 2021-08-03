#! /bin/bash

echo "Running script to setup database"


psql $DB_URL -f ./transactional/growbemoduledef.sql
psql $DB_URL -f ./transactional/growbewarningkey.sql
psql $DB_URL -f ./transactional/emailtemplate.sql
psql $DB_URL -f ./transactional/user.sql
psql $DB_URL -f ./transactional/role.sql
psql $DB_URL -f ./transactional/userrolemapping.sql