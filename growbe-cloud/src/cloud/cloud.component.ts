import { addCRUDModelsControllerWithRelations } from '@berlingoqc/lb-extensions';
import {
  Component,
  LifeCycleObserver,
  CoreBindings,
  inject,
  Application,
} from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import { GrowbeMainboardController } from './controllers';
import { CRUD_CONTROLLERS } from './crud-controller';

export class CloudComponent implements Component {

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: RestApplication
  ) {
    addCRUDModelsControllerWithRelations(app, CRUD_CONTROLLERS);
  }

  controllers = [GrowbeMainboardController];
  bindings = [];
}