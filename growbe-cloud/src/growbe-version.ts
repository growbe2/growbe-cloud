import { sleep } from '@berlingoqc/sso';
import {ApplicationConfig, GrowbeCloudApplication} from './application';
import { CloudComponent } from './cloud';
import {GrowbeSensorValueRepository} from './repositories';
import { GrowbeMainboardVersionService, MQTTService } from './services';
import {WatcherComponent} from './watcher/watcher.component';

export async function version(args: string[]) {
  const options: ApplicationConfig = {};
  options.strategy = 'remote';
  options.pkg = require('../package.json');
  options.dirname = __dirname;
  const app = new GrowbeCloudApplication(CloudComponent, options);
  await app.boot();


  const version = args[2];

  if (version === 'latest' || version[0] === 'v') {
	const service = await app.get('services.GrowbeMainboardVersionService').then(x => x as GrowbeMainboardVersionService);
	await service.mqttService.connect();
	await service.releaseNewVersion(version);
	await sleep(2000);
  	process.exit(0);
  } else {
	console.error("Invalid version argument must be 'latest' or v*.*.* was " + version)
  	process.exit(1);
  }
}

version(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
