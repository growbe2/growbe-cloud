import {param, post, requestBody} from '@loopback/openapi-v3';
import {authenticate} from '@loopback/authentication';
import {GrowbeModuleService} from '../../services';
import {GrowbeModule} from '../../models';
import {service} from '@loopback/core';

export class GrowbeModuleController {
  constructor(
    @service(GrowbeModuleService)
    private growbeModuleService: GrowbeModuleService,
  ) {}

  @post('/growbeModules/{id}/config')
  @authenticate('jwt')
  setConfig(@param.path.string('id') id: string, @requestBody() config: any) {
    return this.growbeModuleService.setModuleConfig(id, config);
  }
}
