import {ApplicationConfig, GrowbeCloudApplication} from './application';
import { GrowbeSensorValueRepository } from './repositories';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const options: ApplicationConfig = {}
  options.strategy = 'remote';
  options.pkg = require('../package.json');
  options.dirname = __dirname;
  const app = new GrowbeCloudApplication(options);
  await app.boot();
  await app.migrateSchema({existingSchema});

  const repo = await app.getRepository(GrowbeSensorValueRepository);
  console.log(await repo.create({}));

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
