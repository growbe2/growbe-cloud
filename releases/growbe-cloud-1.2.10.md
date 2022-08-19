# Version 1.2.10

## What's new

* Add support for new Android Phone Module
* Add support for multiple comboard on the mainboard
* Fix vulnerabilities in dependency.
* Split helm chart to allow external user to host instance of growbe-cloud

## Details

*  feat(cloud): add field for multiple comboard (GC-238) (#79) 
*  feat(portal): add combord addr to modules list (GC-240) (#80)
*  feat(cloud): add support for AND in the backend (GC-243) (#81)
*  feat(db): add migration docker image and k8s job (GC-242) (#82)
*  build(deps): bump loopback-connector-postgresql
*  feat(helm): use external chart for growbe-cloud