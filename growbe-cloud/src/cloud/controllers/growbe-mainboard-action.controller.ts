
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
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.updateConfig(id, body, direct);
  }

  @patch("/growbe/{id}/update")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendUpdateRequest(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.sendUpdateRequest(id, direct);
  }

  @patch("/growbe/{id}/restart")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendRestartRequest(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.sendRestartRequest(id, direct);
  }

  @patch("/growbe/{id}/reboot")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendRebootRequest(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.sendRebootRequest(id, direct);
  }

  @patch("/growbe/{id}/localconnection")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendLocalConnectionRequest(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.sendLocalConnectionRequest(id, direct);
  }

  @patch("/growbe/{id}/helloworld")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  sendHelloWorldRequest(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.sendHelloWorldRequest(id, direct);
  }

  @patch('/growbe/{id}/sync')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setGrowbeSync(
    @param.path.string('id') id: string,
    @param.query.boolean('direct') direct: boolean,
    @requestBody() body: any
  ) {
    return this.growbeActionService.sendSyncRequest(id, direct);
  }

  @patch('/growbe/{id}/processconfig')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setGrowbeProcessConfig(
    @param.path.string('id') id: string, @requestBody() body: any,
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeActionService.sendProcessConfig(id, body, direct);
  }


}
