import pb from '@growbe2/growbe-pb';
import { BindingScope, injectable, service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { MQTTService, getTopic } from './mqtt.service';
import { GroupEnum, SeverityEnum } from '../models';
import { VirtualRelay } from '../models/virtual-relay.model';
import { VirtualRelayRepository } from "../repositories/virtual-relay.repository";
import { GrowbeLogsService } from './growbe-logs.service';

@injectable({scope: BindingScope.TRANSIENT})
export class VirtualRelayService {
  constructor(
    @repository(VirtualRelayRepository)
    private virtualRelayRepo: VirtualRelayRepository,
    @service(MQTTService)
    private mqttService: MQTTService,
    @service(GrowbeLogsService)
    private logsService: GrowbeLogsService,
  ) {}

  async create(
    growbeId: string,
    data: pb.VirtualRelay,
  ) {

    await this.mqttService.sendWithResponse(
      growbeId,
      getTopic(growbeId, '/board/addVr'),
      pb.VirtualRelay.encode(data).finish(),
      {responseCode: pb.ActionCode.SYNC_REQUEST, waitingTime: 2000}
    ).toPromise();

    
    let virtual_relay = await this.virtualRelayRepo.create(new VirtualRelay({
      id: data.name,
      growbeMainboardId: growbeId,
      relay: data,
    }));

    await this.logAndNotifyCloud(growbeId, "created", virtual_relay);
    
    return virtual_relay;
  }

  async update(
    growbeId: string,
    data: pb.VirtualRelay,
  ) {

    await this.mqttService.sendWithResponse(
      growbeId,
      getTopic(growbeId, '/board/updVr'),
      pb.VirtualRelay.encode(data).finish(),
      {responseCode: pb.ActionCode.SYNC_REQUEST, waitingTime: 2000}
    ).toPromise();

    let virtual_relay = await this.virtualRelayRepo.updateById(data.name, {relay: data})

    await this.logAndNotifyCloud(growbeId, "updated", new VirtualRelay({relay: data}));

    return virtual_relay;
  }

  async delete(
    growbeId: string,
    virtualRelayId: string,
  ) {

    let virtual_relay = await this.virtualRelayRepo.findById(virtualRelayId);

    await this.mqttService.sendWithResponse(
      growbeId,
      getTopic(growbeId, '/board/rmVr'),
      pb.VirtualRelay.encode(virtual_relay.relay).finish(),
      {responseCode: pb.ActionCode.SYNC_REQUEST, waitingTime: 2000}
    ).toPromise();
    
    await this.virtualRelayRepo.deleteById(virtualRelayId);

    await this.logAndNotifyCloud(growbeId, "deleted", virtual_relay);

    return virtual_relay;
  }

  async applyConfig(
    growbeId: string,
    virtualRelayId: string,
    config: pb.RelayOutletConfig,
  ) {

    let virtual_relay = await this.virtualRelayRepo.findById(virtualRelayId);

    virtual_relay.config = config;

    await this.mqttService.sendWithResponse(
      growbeId,
      getTopic(growbeId, '/board/vrconfig/' + virtual_relay.relay.name),
      pb.VirtualRelay.encode(virtual_relay.config).finish(),
      {responseCode: pb.ActionCode.SYNC_REQUEST, waitingTime: 2000}
    ).toPromise();
    
    await this.virtualRelayRepo.updateById(virtualRelayId, virtual_relay);

    await this.logAndNotifyCloud(growbeId, "config", virtual_relay);

    return virtual_relay;
  }

  private async logAndNotifyCloud(
    growbeId: string,
    operationName: string,
    virtual_relay: VirtualRelay,
  ) {
    await this.logsService.addLog({
      group: GroupEnum.MAINBOARD,
      type: "virtual_relay" as any,
      severity: SeverityEnum.LOW,
      growbeMainboardId: growbeId,
      message: `virtual relay ${operationName} ${JSON.stringify(virtual_relay)}`
    });

    await this.mqttService.send(
      getTopic(growbeId, `/cloud/virtualrelay/${virtual_relay.id}/${operationName}`),
      JSON.stringify(virtual_relay),
    );
  }
} 