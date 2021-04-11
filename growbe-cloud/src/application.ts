import {AlbAuthMixin, AuditzComponent, RevisionRepository, SSOAuthBindings} from '@berlingoqc/lb-extensions';
import {OrganisationRepository, UserRepository} from '@berlingoqc/sso';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Component, Constructor} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {Subject} from 'rxjs';
import {GrowbeMainboardBindings, MQTTBindings} from './keys';

export {ApplicationConfig};

export class GrowbeCloudApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(AlbAuthMixin(RestApplication))),
) {
  constructor(component: Constructor<Component>,options: ApplicationConfig = {}) {
    super(options);

    if(component)
      this.component(component);
    this.setupSSOBindings();
    this.setupAuditz();
    this.addUserAndOrganisation();


    this.bind(GrowbeMainboardBindings.DEFAULT_CONFIG).to({
        hearthBeath: 30
    });

    this.bind(GrowbeMainboardBindings.WATCHER_STATE_EVENT).to(new Subject());
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

    this.bind(MQTTBindings.URL).to(process.env.MQTT_URL);
    this.bind('datasources.config.postregsql').to({
      name: 'postregsql',
      connector: 'postgresql',
      url: process.env.DB_URL ?? '',
    })
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

export async function main(component: Constructor<Component>, options: ApplicationConfig = {}) {
  options.strategy = 'remote';
  options.pkg = require('../package.json');
  options.dirname = __dirname;
  const app = new GrowbeCloudApplication(component, options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

export function start(component: Constructor<Component>) {
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
  main(component, config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
