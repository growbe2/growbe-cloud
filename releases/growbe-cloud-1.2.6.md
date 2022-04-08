# Version 1.2.6

## What's new

* Autoupdate is now working for mainboard with it activated
* New form to edit a mainboard process config
* Component to generate growbe image configuration
    * New form to generate a config
    * Allow to download a zip archive with all required files to put in your SD card
* Mainboard can now update it's config in the cloud
* Add caching to module data , to optimize request to the database

## Details

* feat(api): send and receive process config from mainboard
* fix(api): change topic for processconfig
* fix(helm): add growbe debug log to growbe-cloud
* feat(portal): add process config form
* fix(portal): padding issue in main container
* feat(api): add api to generate image config
* fix(helm): temp pass id_rsa badly
* feat(portal): add ui for image config
* fix(api): add endpoint to publish new version
* fix(portal): bad mapping for reboot process config
* fix(api): add curl to docker
* fix(watcher): cache and indexing to sensor value
* fix(api): image zip async only and cache executable
* fix(k9s): add timezone to america toronto
