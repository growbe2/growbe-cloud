import {
  AlbAuthMixin,
  AuditzComponent,
  RevisionRepository,
  SSOAuthBindings,
} from '@berlingoqc/lb-extensions';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Component, Constructor} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {Subject} from 'rxjs';
import {GrowbeMainboardBindings, MQTTBindings, ReverseProxyBindings} from './keys';
import { GrowbeDataSubjectObserver } from './observers';

import { GrowbeMetricsComponent } from './component/metrics/metrics.component';
import { UserRepository } from '@berlingoqc/sso/dist/repositories/user.repository';
import { OrganisationRepository } from '@berlingoqc/sso/dist/repositories/organisation.repository';

export {ApplicationConfig};

export class GrowbeCloudApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(AlbAuthMixin(RestApplication))),
) {

  static DEBUG = require('debug')('growbe:app');
  constructor(
    components: Constructor<Component>[],
    options: ApplicationConfig = {},
  ) {
    super(options);

    if (components && components.length > 0) {
      for (const component of components) {
        this.component(component);
      }
    }

    this.setupSSOBindings();
    this.setupAuditz();
    this.addUserAndOrganisation();

    this.bind(GrowbeMainboardBindings.DEFAULT_CONFIG).to({
      hearthBeath: 30,
    });

    this.bind(GrowbeMainboardBindings.WATCHER_STATE_EVENT).to(new Subject());

    this.lifeCycleObserver(GrowbeDataSubjectObserver);

    this.component(GrowbeMetricsComponent);
  }

  private addUserAndOrganisation() {
    this.repository(UserRepository);
    this.repository(OrganisationRepository);
  }

  private setupAuditz() {
    this.component(AuditzComponent);
    this.repository(RevisionRepository);
  }

  private setupSSOBindings() {
    const ssoUrl = (process.env.SSO_URL ?? 'http://localhost:3001') as string;
    this.bind(SSOAuthBindings.SSO_URL).to(ssoUrl);

    const reverseProxyUrl = (process.env.REVERSE_PROXY_URL) as string;
    this.bind(ReverseProxyBindings.URL).to(reverseProxyUrl);

    this.bind(MQTTBindings.URL).to(process.env.MQTT_URL);
    this.bind('datasources.config.postregsql').to({
      name: 'postregsql',
      connector: 'postgresql',
      url: process.env.DB_URL ?? '',
    });
    this.bind('datasources.config.pgsql').to({
      name: 'pgsql',
      connector: 'postgresql',
      url: process.env.DB_URL ?? '',
    });
    this.bind('datasources.config.mongo').to({
      name: 'mongo',
      connector: 'mongodb',
      url: process.env.MONGO_URL ?? '',
    });
  }
}

export async function main(
  components: Constructor<Component>[],
  options: ApplicationConfig = {},
) {
  if (!options.strategy) {
    options.strategy = 'remote';
  }
  options.pkg = require('../package.json');
  options.dirname = __dirname;
  const app = new GrowbeCloudApplication(components, options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  GrowbeCloudApplication.DEBUG(`Server is running at ${url}`);

  return app;
}

export function start(components: Constructor<Component>[], options?: any) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  try {
    main(components, Object.assign(options || {}, config)).catch(err => {
      GrowbeCloudApplication.DEBUG("cannot start the application", err)
      process.exit(1);
    });
  } catch (exception) {
    console.error(exception);
  }
}
