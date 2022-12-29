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
    @param.path.string('id') id: string, @requestBody() config: any,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeModuleService.setModuleConfig(id, config, direct);
  }

  @del('/growbeModules/{id}/cmd/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  deleteConfig(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeModuleService.deleteModuleConfig(id, direct);
  }

  @post('/growbeModules/{id}/config/{property}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  setConfigForProperty(
    @param.path.string('property') property: string,
    @param.path.string('id') id: string, @requestBody() config: any,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeModuleService.setModuleConfigForProperty(id, property, config, direct);
  }
}
