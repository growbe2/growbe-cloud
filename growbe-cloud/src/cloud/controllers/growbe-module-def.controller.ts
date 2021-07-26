import { FieldAlarm } from '@growbe2/growbe-pb';
import {service} from '@loopback/core';
import {del, param, post, requestBody} from '@loopback/openapi-v3';
import {GrowbeHardwareAlarmService, GrowbeModuleDefService, OverrideModuleDefRequest} from '../../services';

export class GrowbeModuleDefController {
  constructor(
    @service(GrowbeModuleDefService)
    private moduleDefService: GrowbeModuleDefService,
    @service(GrowbeHardwareAlarmService)
    private growbeHardwareAlarmService: GrowbeHardwareAlarmService,
  ) {}

  @post('/growbeModuleDefs/override')
  overrideModuleDef(@requestBody() request: OverrideModuleDefRequest) {
    return this.moduleDefService.overrideMainboardModuleDef(
      request.moduleId,
      request.moduleName,
    );
  }

  @post('/growbeModuleDefs/{id}/addAlarm')
  addHardwareAlarm(
    @param.path.string('id') mainboardId: string,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.addHardwareAlarm(mainboardId, alarm)
  }

  @post('/growbeModuleDefs/{id}/removeAlarm')
  removeHardwareAlarm(
    @param.path.string('id') mainboardId: string,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.removeHardwareAlarm(mainboardId, alarm)
  }

}
