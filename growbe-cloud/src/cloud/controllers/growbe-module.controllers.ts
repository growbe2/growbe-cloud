import {param, post, requestBody} from '@loopback/openapi-v3';
import {GrowbeModuleService, RelayHistoricService} from '../../services';
import {service} from '@loopback/core';
import {del, get} from '@loopback/rest';
import { authorizeGrowbe, getMainboardByModule } from '../authorization';

export class GrowbeModuleController {
  constructor(
    @service(GrowbeModuleService)
    private growbeModuleService: GrowbeModuleService,
    @service(RelayHistoricService)
    private relayHistoricService: RelayHistoricService
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

  @get('/growbeModules/{id}/relay/{property}/historic')
   @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  getRelayHistoric(
    @param.path.string('property') property: string,
    @param.path.string('id') moduleId: string,
    @param.query.number('since') since: number,
  ) {
    if (!since) {
      let date = new Date();
      date.setDate(date.getDate() - 2);
      since = date.getTime();
    }

    return this.relayHistoricService.getRelayHistoric(moduleId, property, since)
  }


}
