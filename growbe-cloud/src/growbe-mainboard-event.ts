import {ApplicationConfig, GrowbeCloudApplication} from './application';
import { MQTTService } from './services';
import { WatcherComponent } from './watcher/watcher.component';

export async function version(args: string[]) {
  const options: ApplicationConfig = {};
  options.strategy = 'remote';
  options.pkg = require('../package.json');
  options.dirname = __dirname;
  const app = new GrowbeCloudApplication([WatcherComponent], options);
  await app.boot();
  const mqtt = (await app.get('services.MQTTService')) as MQTTService;
  await mqtt.connect();
  return app.get('services.MqttEventService');
}

