# MQTT Documentation


## Growbe Mainboard Topic

The growbe topic are all the topic inside /growbe/:id/* excluding /growbe/:id/cloud/
that is for the cloud event emitting for the client app.

All the payload are serialize using protobuf for the communication with
the mainboard.

### Sending

#### /growbe/:id/hearthbeath

Send by the growbe to keep connection alive when
no other message are being send to the cloud.

Payload: [HearthBeath](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/message.proto#L13)

#### /growbe/:id/hello

Send by the growbe on startup.

Payload: [HelloWorld](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/board.proto#L8)

#### /growbe/:id/m/:moduleId/state

Send by the growbe when the status of on module
changed

Payload: [ModuleData](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/module.proto#L3)

#### /growbe/:id/m/:moduleId/data

Send by the growbe when the module data changed.
The structure is different for each type of module

Payload: [THLModuleData](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/module.proto#L13)
Payload: [SOILModuleData](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/module.proto#L18)

### Receiving

#### /growbe/:id/config

Set the configuration for the growbe

Payload: [GrowbeMainboardConfig](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/board.proto#L4)

#### /growbe/:id/setTime

Set the RTC of the growbe.

Payload: [RTCTime](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/proto/message.proto#L22)

#### /growbe/:id/sync

Send to ask the growbe to resync is configuration to the
cloud. Normally call after a lost of connection.

Payload: None

## Growbe Cloud Topic

Those topic are sending JSON payload.

### Receiving

### Emiting

#### /growbe/:id/cloud/state

After growbe state change.

Payload: [GrowbeMainboard](https://github.com/growbe2/growbe-cloud/blob/master/growbe-cloud-api/angular/projects/growbe-cloud-api/src/lib/cloud/model/growbeMainboard.ts)

#### /growbe/:id/cloud/logs

After log event.

Payload: [GrowbeLogs](https://github.com/growbe2/growbe-cloud/blob/master/growbe-cloud-api/angular/projects/growbe-cloud-api/src/lib/cloud/model/growbeLogs.ts)

#### /growbe/:id/cloud/stream

After a stream start or end for the growbe.

Payload:
```js
{
    id: "NQHAB1k2", // uid of the stream in NMS
    StreamPath: "/live/1F54018", // path of the stram
    state: "starting", // starting | done
}
```

#### /growbe/:id/cloud/m/:moduleId/data

After sensor value.

Payload: [GrowbeSensorValue](https://github.com/growbe2/growbe-cloud/blob/65d5edb3473f613d969daa0965fcd64341d46449/growbe-cloud-api/angular/projects/growbe-cloud-api/src/lib/cloud/model/growbeSensorValue.ts#L14)


### /growbe/:id/cloud/m/:moduleId/state

After module state.

Payload: [GrowbeModule](https://github.com/growbe2/growbe-cloud/blob/master/growbe-cloud-api/angular/projects/growbe-cloud-api/src/lib/cloud/model/growbeModule.ts)
