// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {param, patch, post, requestBody} from '@loopback/openapi-v3';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {GrowbeRegisterRequest, GrowbeService} from '../../services';
import {
  GraphModuleRequest,
  ModuleDataRequest,
  ModuleValueGraphService,
} from '../../services/module-value-graph.service';

// import {inject} from '@loopback/core';

export class GrowbeMainboardController {
  constructor(
    @service(GrowbeService) private growbeService: GrowbeService,
    @service(ModuleValueGraphService)
    private graphService: ModuleValueGraphService,
  ) {}

  @post('/growbe/register')
  @authenticate('jwt')
  registerGrowbe(
    @inject(SecurityBindings.USER) user: UserProfile,
    @requestBody() request: GrowbeRegisterRequest,
  ) {
    return this.growbeService.register(user.id, request);
  }

  @patch('/growbe/{id}/config')
  @authenticate('jwt')
  setGrowbeConfig(
    @param.path.string('id') id: string,
    @requestBody() body: any,
  ) {
    return this.growbeService.updateConfig(id, body);
  }

  @patch('/growbe/{id}/rtc')
  @authenticate('jwt')
  setGrowbeRTC(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeService.setRTC(id, body);
  }

  @post('/growbe/graph')
  @authenticate('jwt')
  getGraph(@requestBody() request: GraphModuleRequest) {
    return this.graphService.getGraph(request);
  }

  @post('/growbe/average')
  @authenticate('jwt')
  getAverage(@requestBody() request: ModuleDataRequest) {
    return this.graphService.getAverage(request);
  }

  @post('/growbe/lastread')
  @authenticate('jwt')
  getLastValue(@requestBody() request: ModuleDataRequest) {
    return this.graphService.getLastRead(request);
  }
}
