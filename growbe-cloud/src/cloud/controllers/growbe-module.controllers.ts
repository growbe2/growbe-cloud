import {param, post, requestBody} from '@loopback/openapi-v3';
import {GrowbeModuleService} from '../../services';
import {service} from '@loopback/core';
import {del} from '@loopback/rest';
import { authorizeGrowbe, getMainboardByModule } from '../authorization';

export class GrowbeModuleController {
  constructor(
    @service(GrowbeModuleService)
    private growbeModuleService: GrowbeModuleService,
  ) {}

  @post('/growbeModules/{id}/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  setConfig(
    @param.path.string('id') id: string, @requestBody() config: any
  ) {
    return this.growbeModuleService.setModuleConfig(id, config);
  }

  @del('/growbeModules/{id}/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  deleteConfig(
    @param.path.string('id') id: string
  ) {
    return this.growbeModuleService.deleteModuleConfig(id);
  }

  @post('/growbeModules/{id}/config/{property}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  setConfigForProperty(
    @param.path.string('property') property: string,
    @param.path.string('id') id: string, @requestBody() config: any
  ) {
    return this.growbeModuleService.setModuleConfigForProperty(id, property, config);
  }
}
