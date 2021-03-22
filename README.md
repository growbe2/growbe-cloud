# Growbe Cloud

This is a mono-repo for the growbe-cloud project.

## Projects

The detail for every one is in there own `README.md`

* [growbe-cloud](growbe-cloud/)
* [growbe-portal](growbe-portal/)
* [growbe-proxy](growbe-proxy/)
* [growbe-proto](proto/)


## Environment

### PROD

* [sso-swagger](https://auth.growbe.wquintal.ca/api/explorer)
* [cloud-swagger](https://api.growbe.wquintal.ca/explorer)
* [portal](https://portal.growbe.wquintal.ca)
* broker mqtt://broker.growbe.wquintal.ca:1883

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
./docker/migration.sh pg-backup cloud
./docker/migration.sh mongo-backup cloud

## Restoring of database
./docker/migration.sh pg-restore local ./backups/cloud_pg_...sh
./docker/migration.sh mongo-restore local ./backups/cloud_mongo_...sh
```

## How to contribute

Go on `develop` branch, make sure you have the latest version:

```shell
git fetch
git pull
```

Create new branch

```shell
git checkout -b <type>/<ticket-id || name>
```

The name of the new branch is the type of task and the JIRA ticket number

Make your changes, after pushing your changes, create a PR.

Change the base branch to: `develop`

#### Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test
```


##### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Chan/ing missing tests or correcting existing tests

##### Scope

The scope should be the name of the component affected.

* `cloud`
* `portal`
* `proxy`
* `proto`
* `docker`
* `ci`

##### Summary

Use the summary field to provide a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

##### Pull Request

Pull request for new feature should be merge into `develop`

Put the link of the Jira ticket in the description.

If changes are complexe you can explaine what you did also in the description.

Click on Create pull resquest button.

After the PR is approved to be merge, do a Sqash and merge. Add the ticket number to the message if it's not already there.

##### How to promote to Staging

NO STAGING FOR NOW

##### How to promote to Production

Go to `develop` branch, make sure you have the latest

```bash
git fetch
git pull
```

Create a new branch named `dev-to-master`

If some commit on dev should not be deployed to staging you have to drop them,

```bash
git rebase -i master
```

After create a pull request `master` <- `dev-to-master`

Name the pull-request `version(x.y.z)`

After the pull request is made and the pipeline sucessfully ended
you can create the tag for the version and publish it to github

```bash
export VERSION=$(npm run version --silent)
git tag -a $VERSION -m "Release $VERSION"
git push origin $VERSION
```

After you publish the tag , a release note is created
and you need to add the information of all the ticket
and work that has been done in this release.

Exemple :

```md
# growbe-cloud

* TICKET-001 Blah blah blah
* TICKET-001 Blah blah blah

# growbe-portal

* TICKET-001 Blah blah blah
* TICKET-001 Blah blah blah
```

After uncheck the prelease checkbox to release this version.
This will update the website in production.
