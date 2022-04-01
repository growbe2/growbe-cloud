

## What's new

* Finishing the support for hardware alarm on your module.
* Fixing issue with mqtt topic after connection lost.
* Relay module applying partial config to module to not retrigger the creation of cycle and timer.

## Details

* fix(alarm): save previous value to include in event
* fix(alarm): allowed to remove alarm
* fix(aas): reduce diference for change to 1
* fix(socket): reconnect to topic after connection lost
* fix(relay): apply only changed property in config
