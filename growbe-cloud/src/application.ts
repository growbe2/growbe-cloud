import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {AlbAuthMixin, SSOAuthBindings} from '@berlingoqc/lb-extensions';
import { MQTTBindings } from './keys';

export {ApplicationConfig};

export class GrowbeCloudApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(AlbAuthMixin(RestApplication))),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.setupSSOBindings();
  }

  private setupSSOBindings() {
    const ssoUrl = (process.env.SSO_URL ?? 'http://localhost:3001') as string;
    this.bind(SSOAuthBindings.SSO_URL).to(ssoUrl);

    this.bind(MQTTBindings.URL).to(process.env.MQTT_URL);
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
