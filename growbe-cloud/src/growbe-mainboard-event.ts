import {ApplicationConfig, GrowbeCloudApplication} from './application';
import { CloudComponent } from './cloud';

export async function version(args: string[]) {
  const options: ApplicationConfig = {};
  options.strategy = 'remote';
  options.pkg = require('../package.json');
  options.dirname = __dirname;
  const app = new GrowbeCloudApplication(CloudComponent, options);
  await app.boot();
}

version(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
