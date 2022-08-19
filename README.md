# Growbe Cloud

This is a mono-repo for the growbe-cloud project.

## Projects

The detail for every one is in there own `README.md`

* [growbe-cloud](growbe-cloud/)
* [growbe-portal](growbe-portal/)
* [growbe-proxy](growbe-proxy/)
* [growbe-proto](proto/)


## Environment

### Monitoring

* [grafana](https://graphana.growbe.ca/?orgId=1)
* [k8s_dashboard](https://dashboard.growbe.ca/#/workloads?namespace=growbe-prod)
* [prometheus](https://prometheus.growbe.ca/graph?g0.expr=&g0.tab=1&g0.stacked=0&g0.range_input=1h)

### DEV

* [sso-swagger](https://auth.dev.growbe.ca/api/explorer)
* [cloud-swagger](https://api.dev.growbe.ca/explorer)
* [cloud](https://cloud.dev.growbe.ca)
* broker mqtt://broker.dev.growbe.ca:1884

### PROD

* [sso-swagger](https://auth.growbe.ca/api/explorer)
* [cloud-swagger](https://api.growbe.ca/explorer)
* [portal](https://portal.growbe.ca)
* broker mqtt://broker.dev.growbe.ca:1883

## Run locally

* You need to install `docker` and `docker-compose`
* This script will run all the cloud locally on your computer

```bash
# Run first time only to build dependency
./docker/cloud.sh build
# To run to script in a daemon
./docker/cloud.sh start
# To stop everything
./docker/cloud.sh stop
# To print the log
./docker/cloud.sh logs
# To update to the latest version
./docker/cloud.sh update
```

## Environement file

You can download the environement file for all the envrionement
with this command if you are allow to:

```bash
scp -r root@api.growbe.wquintal.ca:envs ./docker/
```

This is the local file when you locally run the docker-compose cloud.

```bash
export DB_URL="postgresql://test:test@192.168.2.26:5432/defaultdb"
export SSO_URL="http://localhost:3001"
export MONGO_URL="mongodb://doadmin:test@192.168.2.26:27017/growbe?authSource=admin"
export MQTT_URL="mqtt://localhost:1883"

export SSO_SETTINGS="{\"publicCreation\":true,\"multiFactor\":false,\"accountValidation\":true, \"defaultRoles\": []}"
export EMAIL_FROM='"Xmation" <info@alborea.com>'
export EMAIL_USER=apikey
export EMAIL_PASSWORD=
export EMAIL_REDIRECT=http://localhost:4200
export SMS_SID=""
export SMS_TOKEN=""
export SMS_NUMBER=""
export OTP_SECRET=5ytrfedsa
export JWT_SECRET=542rewdasr
export JWT_TTL=3600
```

All the environment file must be store in `./docker/envs/<name>.sh`

## Migration of database

Exemple of backup the prod to local database.
All database must be destroy before doing the restoring.

```bash
## Backup of database
./scripts/migration.sh pg-backup cloud
./scripts/migration.sh mongo-backup cloud

## Restoring of database
./scripts/migration.sh pg-restore local ./backups/cloud_pg_...sh
./scripts/migration.sh mongo-restore local ./backups/cloud_mongo_...sh
```

## Integration test environment

```
# Start ressource to run unit test
./scripts/integration.sh start 

cd growbe-cloud && npm run ut:run

# Stop when your finish
./scripts/integration.sh stop


# Run unit test with lastest docker image for growbe-cloud
./scripts/integration.sh test
```


## Kubernetes deployment with helm

```bash
# Set the k8s config file for your envrionment
export KUBECONFIG="$HOME/.cluster_home"
# Install the chart to your cluster
helm install growbe-cloud helm --values helm/values.yaml