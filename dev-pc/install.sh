#! /bin/bash

git clone --branch develop https://github.com/growbe2/growbe-cloud

## Logiciel a installer
# openssh client et serveur pour acces a distance
# autossh pour maintenir le reverse proxy
# nodejs et npm pour executer le proxy
# mcuexpresso pour debug et upload le code

sudo apt update && \
sudo apt upgrade && \
sudo apt-get install openssh-client openssh-server nodejs npm autossh

## Configuration a faire
# générer un token pour cloner les repos et download les packages
# installer le proxy
# configurer le serveur ssh et le autossh
# pusher le latest code avec mcuxpresso

sudo systemctl start openssh
sudo systemctl start autossh-dev
ssh-keygen
## upload la clé dans mes trucs connues

