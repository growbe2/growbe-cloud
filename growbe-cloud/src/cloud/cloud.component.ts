import {addCRUDModelsControllerWithRelations} from '@berlingoqc/lb-extensions';
import {Component, CoreBindings, inject} from '@loopback/core';
import {ApplicationWithRepositories} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  GrowbeStreamComponent,
  GrowbeStreamRepository,
  NMSBindings,
} from '../component';
import {
  GrowbeMainboardController,
  GrowbeModuleDefController,
} from './controllers';
import {GrowbeModuleController} from './controllers/growbe-module.controllers';
import {CRUD_CONTROLLERS} from './crud-controller';

export class CloudComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: RestApplication & ApplicationWithRepositories,
  ) {
    addCRUDModelsControllerWithRelations(app, CRUD_CONTROLLERS);

    const nmsToken = process.env.NMS_TOKEN;
    if (nmsToken) {
      app.bind(NMSBindings.NMS_KEY).to(nmsToken);
      app.bind(NMSBindings.NMS_PASSWORD).to(process.env.NMS_API_PASSWORD ?? '');
      app.bind(NMSBindings.NMS_USERNAME).to(process.env.NMS_API_USERNAME ?? '');
      app.bind(NMSBindings.NMS_URL).to(process.env.NMS_API_URL ?? '');
      app.component(GrowbeStreamComponent);
      app.repository(GrowbeStreamRepository);
    }
  }

  controllers = [
    GrowbeMainboardController,
    GrowbeModuleDefController,
    GrowbeModuleController,
  ];
  bindings = [];
}
