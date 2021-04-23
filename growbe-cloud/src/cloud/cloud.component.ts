import {addCRUDModelsControllerWithRelations} from '@berlingoqc/lb-extensions';
import {Component, CoreBindings, inject} from '@loopback/core';
import {ApplicationWithRepositories} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  GrowbeStreamComponent,
  GrowbeStreamRepository,
  NMSBindings,
} from '../component';
import {GrowbeMainboardController} from './controllers';
import {CRUD_CONTROLLERS} from './crud-controller';

export class CloudComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: RestApplication & ApplicationWithRepositories,
  ) {
    addCRUDModelsControllerWithRelations(app, CRUD_CONTROLLERS);

    const nmsToken = process.env.NMS_TOKEN;
    if (nmsToken) {
      console.log('Enabling GrowbeStreamServer');
      app.bind(NMSBindings.NMS_KEY).to(nmsToken);
      app.component(GrowbeStreamComponent);
      app.repository(GrowbeStreamRepository);
    }
  }

  controllers = [GrowbeMainboardController];
  bindings = [];
}
