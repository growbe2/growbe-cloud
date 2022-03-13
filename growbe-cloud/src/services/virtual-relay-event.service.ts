import { BindingScope, injectable, service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { getTopic, GrowbeLogsService, MQTTService } from ".";
import { GrowbeSensorValueRepository, VirtualRelayRepository } from "../repositories";
import * as pb from '@growbe2/growbe-pb';
import { GroupEnum, GrowbeSensorValue } from "../models";


@injectable({scope: BindingScope.TRANSIENT})
export class VirtualRelayEventService {
  constructor(
    @repository(VirtualRelayRepository)
    private virtualRelayRepo: VirtualRelayRepository,
    @repository(GrowbeSensorValueRepository)
    private sensorValueRepository: GrowbeSensorValueRepository,
    @service(MQTTService)
    private mqttService: MQTTService,
    @service(GrowbeLogsService)
    private logsService: GrowbeLogsService,
  ) {}

  async onVirtualRelayState(growbeId: string, event: pb.VirtualRelayState) {

    const vr = await this.virtualRelayRepo.findById(event.id);

    vr.state = event.state;
    vr.message = event.message;
    vr.updatedAt = new Date();

    await this.virtualRelayRepo.update(vr);

    await this.mqttService.send(getTopic(growbeId, `/cloud/virtualrelay/${event.id}/state`), JSON.stringify(vr));

    await this.logsService.addLog({
        group: GroupEnum.MAINBOARD,
        type: 'virtual_relay_state' as any,
        message: `virtual relay ${vr.id} new state is ${vr.state}`,
    });
  }

  async onVirtualRelayData(growbeId: string, vrId: string, event: pb.VirtualRelayData) {
    const value = new GrowbeSensorValue({
        moduleId: vrId,
        moduleType: 'VR',
        growbeMainboardId: growbeId,
        createdAt: Date.now(),
        endingAt: Date.now(),
        values: event,
        samples: [],
      });
    
    await this.sensorValueRepository.create(value);
    
    await this.mqttService.send(getTopic(growbeId, `/cloud/virtualrelay/${vrId}/data`), JSON.stringify(event))
  }
}