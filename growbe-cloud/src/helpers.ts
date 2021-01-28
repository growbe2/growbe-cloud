import mqtt from 'mqtt';
import {Observable} from 'rxjs';

export function mqttObservable(url: string) {
  const client = mqtt.connect(url);
  return new Observable(sub => {
    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', JSON.stringify({}));
        } else {
            sub.error(err)
        }
      });
    });
    client.on('message', function (topic, message) {
        sub.next({topic, message: JSON.parse(message.toString())})
        console.log('SUB NEXT',topic);
    });
  });
}
