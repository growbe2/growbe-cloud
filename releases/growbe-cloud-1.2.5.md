# Version 1.2.5 
## What's new

* Complete rework of the default module dashboard.
* More clearer and mobile friendlier form for dashboard item , alarms and module config.
* Module table add new row when new module is connected.
* Finishing the component to control a relay
* Use https certificate with auto-renewal
* Add support for hardware alarm creation , editing, deleting and tracking.
* Updated to the graphs:
  * Support the addition of a legends
  * Use the displayName of property instance of the property name
  * Format the date to display clearer value
  * Fixe issue of tooltip in dashboard
* Add component to display the updating time of the ressources and if it's outdated
  * Use in module-svg
  * Use in module-last-value
  * Use in local-connection
* Adding Integration test in the backend in our deployment pipeline.
* Fix dashboard form for video-stream and allowed to muted by default.
* Removing bug that log multiple time the same event.
* Add release files with history in the growbe-cloud website
* Add loading animation to the dashboard components.
* Allow to shared dashboard with member of organisation (no UI atm)
* Fix issue with the growbe-state component
* Other small bug fixe and styling issue.

## Details

* fix(portal): module dashboard (GC-73)
* fix(portal): fixe module def style
* fix(portal): add better label graph generator
* fix(portal): add new row when module connect (GC-66)
* feat(cloud): add new endpoint for dashboard to allow default shared
* feat(portal): add default dashboard (GC-64)
* fix(db): range thl (GC-151)
* feat: better ui for relay (GC-164) (#69)
* fix(watcher): only wait for heartBeathRate time instead of double
* fix(watcher): only wait for heartBeathRate time instead of double
* fix(helm): add ingress for stream and expose externalIp
* fix(k8s): use cert-manager for prod certificate
* fix(svg): bad mapping of probe soil (GC-147)
* fix(por): notification command and relay (GC-189) (#70)
* fix(por): alarm form (GC-192)
* fix(cloud): add updatedAt to some ressources
* fix(cloud): add updatedAt to some ressources
* fix(cloud): module and mainboard state (#71)
* fix(portal): upgrade autoform component
* fix(portal): infinit spinner loading site
* feat(portal): add outdated value component
* fix(watcher): add updatedAt for local connection
* feat(portal): add modification date for module state table and local …
* fix(ci): rework pipeline dev
* fix(cloud): rework api for alarm with ut (#72)
* fix(portal): publish lib manually for backend api
* fix(portal): publish lib manually for backend api
* fix(portal): fix default dashboard
* fix(api): alarm use standard format
* fix(portal): fix dashboard from previous commit for default
* fi(portal): edit graph in dashboard
* fix(portal): fix module_graph no diff on n/a property
* fix(portal): tooltip graph dashboard (GC-194)
* fix(portal): last value error sometime on reloading
* fix(portal): stream make dashboard friendly and add mute input
* feat(portal): alarm working with log
* fix(api): use param from path for del alarm
* fix(api): use put for update hardware alarm
* feat(watcher): store last alarmevent
* feat(portal): add alarm as reference line in chart
* feat(portal): alarm ui crud (#73)
* fix(api): test alarm broken
* feat(api): add storage and release file
* fix(portal): alarm use displayName of property
* fix(api): add includeAlarms property moduledatarequest
* fix(portal): include alarms in form for dashboard
* fix(portal): improvement graph
* feat(portal): add loading animation for dashboard
* feat(portal): add api for growbe releases
* feat(api): fetch organisation dashboard
* fix(portal): fix for reference line
* fix(db): use repo for alarm state
* fix(watcher): send cloud mqtt event for alarm event
* feat(portal): add ui for release note
* fix(api): add endpoint for alarm event
* fix(porttal): growbe state multiple sub
