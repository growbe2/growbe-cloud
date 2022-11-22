FROM postgres:14 as base

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && apt-get -yq install wget
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
RUN apt -y update && apt install -yq mongodb-org

COPY ./backup.sh ./

ENV ROOT_FOLDER=/backups/

CMD ["./backup.sh"]