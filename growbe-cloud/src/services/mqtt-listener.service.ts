import { BindingScope, inject, injectable } from "@loopback/context";
import { Application, CoreBindings, service } from "@loopback/core";
import mqtt from 'mqtt';
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { DataSubject } from "../observers/data-subject.model";
import { MQTTService } from "./mqtt.service";

export const getIdFromTopic = (topic: string): string => {
    // TODO Remplacer par une regex
    return topic.split('/')[2];
  }

@injectable({scope: BindingScope.SINGLETON})
export class MqttListnener {
    static DEBUG = require('debug')('growbe:service::mqtt');

    client: mqtt.Client;

    constructor(
        @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
        @service(MQTTService) private mqttService: MQTTService,
    ) {

    }

    async init() {
        return this.mqttService.connect().then(() => this.mqttService.addSubscription('#'));
    }


    addWatcher(subject: DataSubject): Subscription {
        MqttListnener.DEBUG('starting watcher ' + subject.regexTopic);
        return this.mqttService.observable
          .pipe(
            filter(
              x =>
                !x.topic.includes('cloud') &&
                x.topic.includes(subject.regexTopic),
            ),
        ).subscribe((data) => {
          (async () => {
            try {
              const d = subject.model
                ? subject.model.decode(data.message)
                : data.message;
              const serviceSubject = await this.app.get(
                `services.${subject.service.name}`,
              );
              await subject.func(
                getIdFromTopic(data.topic),
                serviceSubject,
                d,
                data.topic,
              );
            } catch (err) {
              MqttListnener.DEBUG("Failed to parse on subject", data.topic, err);
            }
          })()
            .then(() => {})
            .catch(() => {});
        });
  }

  handleEvent(data: {topic: string, message: Buffer}) {

  }

}