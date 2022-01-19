import { BindingScope, inject, injectable } from "@loopback/context";
import { Application, CoreBindings, service } from "@loopback/core";
import mqtt from 'mqtt';
import { GrowbeMainboardBindings } from "../keys";
import { DataSubject } from "../observers/data-subject.model";

export const getIdFromTopic = (topic: string): string => {
    // TODO Remplacer par une regex
    return topic.split('/')[2];
  }

@injectable({scope: BindingScope.SINGLETON})
export class MqttEventService {
    static DEBUG = require('debug')('growbe:service::mqtt');

    client: mqtt.Client;

    constructor(
        @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
        @inject(GrowbeMainboardBindings.WATCHERS) private watchers: DataSubject[],
    ) {

    }

    async handler(data: {topic: string, data: any}) {
        console.log('WATCHERS', this.watchers)
        for (const watcher of this.watchers) {
            await this.handleEvent(watcher, data)
        }
    }

  async handleEvent(subject: DataSubject, data: {topic: string, data: any}) {
      if (data.topic.includes(subject.regexTopic)) {
                console.log('GGGA', data)
        try {
            const d = subject.model
                ? subject.model.decode(data.data)
                : data.data;
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
                console.log('ERR1', err)
              MqttEventService.DEBUG("Failed to parse on subject", data.topic, err);
            }
        }
  }
}