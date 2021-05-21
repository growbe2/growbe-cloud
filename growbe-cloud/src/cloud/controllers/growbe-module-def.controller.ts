import {service} from '@loopback/core';
import {post, requestBody} from '@loopback/openapi-v3';
import {GrowbeModuleDefService, OverrideModuleDefRequest} from '../../services';

export class GrowbeModuleDefController {
  constructor(
    @service(GrowbeModuleDefService)
    private moduleDefService: GrowbeModuleDefService,
  ) {}

  @post('/growbeModuleDefs/override')
  overrideModuleDef(@requestBody() request: OverrideModuleDefRequest) {
    return this.moduleDefService.overrideMainboardModuleDef(
      request.moduleId,
      request.moduleName,
    );
  }
}
