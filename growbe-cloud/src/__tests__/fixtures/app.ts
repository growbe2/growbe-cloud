import {join} from 'path';
import {GrowbeCloudApplication} from '../../application';
import {
  createRestAppClient,
} from '@loopback/testlab';
import {juggler} from '@loopback/repository';
import {GrowbeMainboardBindings} from '../../keys';
import {DeviceLogsComponent} from '../../component/device-logs';

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

  // TODO: rework because it should be optional
  app.component(DeviceLogsComponent);

  app.bind(GrowbeMainboardBindings.WATCHERS).to([]);
  app.bind(GrowbeMainboardBindings.DEFAULT_CONFIG).to({hearthBeath: 5});

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}
