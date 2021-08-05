import {param, post, requestBody} from '@loopback/openapi-v3';
import {GrowbeModuleService} from '../../services';
import {service} from '@loopback/core';
import { authorizeGrowbe } from '../authorization';

export class GrowbeModuleController {
  constructor(
    @service(GrowbeModuleService)
    private growbeModuleService: GrowbeModuleService,
  ) {}

  @post('/growbes/{boardId}/modules/{id}/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setConfig(
    @param.path.string('boardId') boardId: string, 
    @param.path.string('id') id: string, @requestBody() config: any
  ) {
    return this.growbeModuleService.setModuleConfig(id, config);
  }
}
