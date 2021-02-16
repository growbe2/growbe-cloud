import {join} from 'path';
import {GrowbeCloudApplication} from '../../application';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
import {juggler} from '@loopback/repository';
import { BindingScope } from '@loopback/context';
import { DEFAULT_WARNING_KEY } from '../../data/warning-key';
import { GrowbeWarningKeyRepository } from '../../repositories/growbe-warning-key.repository';
import { MockMQTTService } from './mock-mqtt.service';
import { GrowbeMainboardBindings } from '../../keys';

const TEST_DB_CONFIG = {
  name: 'postregsql',
  connector: 'memory',
};

class TestDataSource extends juggler.DataSource {
  constructor() {
    super({TEST_DB_CONFIG});
  }
}

export async function setupApplication(
  component: any,
  init: (app: GrowbeCloudApplication) => Promise<void>,
) {
  const app = new GrowbeCloudApplication(component, {
    rest: {port: '43234'},
    strategy: 'local',
    pkg: {},
    dirname: join(__dirname, '../..'),
    casbin: true,
  });


  await init(app);

  app.bind('datasources.config.mongo').to({name: 'mongo', connector: 'memory'});
  app.bind('datasources.config.pgsql').to({name: 'pgsql', connector: 'memory'});
  app.bind('datasources.postregsql').toClass(TestDataSource).inScope(BindingScope.SINGLETON);
  app.dataSource(new TestDataSource());

  app.bind(GrowbeMainboardBindings.DEFAULT_CONFIG).to({hearthBeath: 5})


  app.bind('services.MQTTService').toClass(MockMQTTService);
  await app.boot();
  //await app.migrateSchema();
  await app.start();


  const repo = await app.getRepository(GrowbeWarningKeyRepository);
  for(const warning of DEFAULT_WARNING_KEY) {
      await repo.create(warning);
  }

  const client = createRestAppClient(app);

  return {app, client};
}
