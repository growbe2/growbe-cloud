import mqtt from 'mqtt';
import {Observable} from 'rxjs';

let client: mqtt.Client;

export function mqttObservable(url: string) {
  if(!client)
    client = mqtt.connect(url);
  return new Observable(sub => {
    client.on('connect', function () {
      client.subscribe('growbe_abc_sensor', function (err) {
        if (!err) {
        } else {
            sub.error(err)
        }
      });
    });
    client.on('message', function (topic, message) {
        sub.next({topic, message: JSON.parse(message.toString())})

        console.log('SUB NEXT',topic, message);
        sub.next
    });
  });
}
