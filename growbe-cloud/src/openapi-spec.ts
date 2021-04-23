import {ApplicationConfig} from '@loopback/core';
import {GrowbeCloudApplication} from './application';
import {CloudComponent} from './cloud';
import {WatcherComponent} from './watcher/watcher.component';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost',
    },
  };
  const outFile = process.argv[2] ?? '';
  config.strategy = 'remote';
  config.pkg = require('../package.json');
  config.dirname = __dirname;
  const app = new GrowbeCloudApplication(CloudComponent, config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
