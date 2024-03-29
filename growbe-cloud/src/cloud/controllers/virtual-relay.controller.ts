import { service } from "@loopback/core";
import { del, param, patch, post, requestBody } from "@loopback/rest";
import { VirtualRelayService } from "../../services";
import { authorizeGrowbe } from "../authorization";
import pb from '@growbe2/growbe-pb';

export class VirtualRelayController {
  constructor(
      @service(VirtualRelayService)
      private virtualRelayService: VirtualRelayService,
  ) {}

  @post('/growbes/{id}/virtualRelays')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  createVirtualRelay(
    @param.path.string("id") growbeId: string,
    @param.query.boolean('direct') direct: boolean,
    @requestBody() config: pb.VirtualRelay,
  ) {
    return this.virtualRelayService.create(growbeId, config, direct);
  }

  @patch('/growbes/{id}/virtualRelays/{id_vr}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  updateVirtualRelay(
    @param.path.string("id") growbeId: string,
    @param.query.boolean('direct') direct: boolean,
    @requestBody() config: pb.VirtualRelay,
  ) {
    return this.virtualRelayService.update(growbeId, config, direct);
  }

  @del('/growbes/{id}/virtualRelays/{id_vr}/del')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  deleteVirtualRelay(
    @param.path.string("id") growbeId: string,
    @param.query.boolean('direct') direct: boolean,
    @param.path.string("id_vr") virtualRelayId: string
  ) {
    return this.virtualRelayService.delete(growbeId, virtualRelayId, direct);
  }

  @patch('/growbes/{id}/virtualRelays/{id_vr}/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  configVirtualRelay(
    @param.path.string("id") growbeId: string,
    @param.path.string("id_vr") idVr: string,
    @param.query.boolean('direct') direct: boolean,
    @requestBody() config: pb.RelayOutletConfig,
  ) {
    return this.virtualRelayService.applyConfig(growbeId, idVr, config, undefined, direct);
  }

  @patch('/growbes/{id}/virtualRelays/{id_vr}/config/{property}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  configVirtualRelayProperty(
    @param.path.string("id") growbeId: string,
    @param.path.string("id_vr") idVr: string,
    @param.path.string("property") property: string,
    @param.query.boolean('direct') direct: boolean,
    @requestBody() config: pb.RelayOutletConfig,
  ) {
    return this.virtualRelayService.applyConfig(growbeId, idVr, config, property, direct);
  }



}
