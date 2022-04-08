
import {inject, service} from '@loopback/core';
import {Filter, Where} from '@loopback/filter';
import {
  param,
  patch,
  requestBody,
} from '@loopback/openapi-v3';

import {
  GrowbeActionService,
  GrowbeService,
} from '../../services';
import {
  ModuleValueGraphService,
} from '../../services/module-value-graph.service';
import { authorizeGrowbe } from '../authorization';





export class GrowbeMainboardActionController {
  constructor(
    @service(GrowbeActionService)
    private growbeActionService: GrowbeActionService,
  ) {}


  @patch('/growbe/{id}/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  async setGrowbeConfig(
    @param.path.string('id') id: string,
    @requestBody() body: any,
  ) {
    return this.growbeActionService.updateConfig(id, body);
  }

  @patch("/growbe/{id}/restart")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendRestartRequest(@param.path.string('id') id: string) {
    return this.growbeActionService.sendRestartRequest(id);
  }

  @patch("/growbe/{id}/reboot")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendRebootRequest(@param.path.string('id') id: string) {
    return this.growbeActionService.sendRebootRequest(id);
  }

  @patch("/growbe/{id}/localconnection")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendLocalConnectionRequest(@param.path.string('id') id: string) {
    return this.growbeActionService.sendLocalConnectionRequest(id);
  }

  @patch("/growbe/{id}/helloworld")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendHelloWorldRequest(@param.path.string('id') id: string) {
    return this.growbeActionService.sendHelloWorldRequest(id);
  }

  @patch('/growbe/{id}/rtc')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setGrowbeRTC(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeActionService.setRTC(id, body);
  }

  @patch('/growbe/{id}/sync')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setGrowbeSync(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeActionService.sendSyncRequest(id);
  }

  @patch('/growbe/{id}/processconfig')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setGrowbeProcessConfig(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeActionService.sendProcessConfig(id, body)
  }


}