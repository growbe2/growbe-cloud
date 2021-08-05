import { FieldAlarm } from '@growbe2/growbe-pb';
import {service} from '@loopback/core';
import {del, param, post, requestBody} from '@loopback/openapi-v3';
import {GrowbeHardwareAlarmService, GrowbeModuleDefService, OverrideModuleDefRequest} from '../../services';
import { authorizeGrowbe } from '../authorization';

export class GrowbeModuleDefController {
  constructor(
    @service(GrowbeModuleDefService)
    private moduleDefService: GrowbeModuleDefService,
    @service(GrowbeHardwareAlarmService)
    private growbeHardwareAlarmService: GrowbeHardwareAlarmService,
  ) {}

  @post('/growbes/{id}/growbeModuleDefs/override')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  overrideModuleDef(
    @param.path.string('id') id: string,
    @requestBody() request: OverrideModuleDefRequest
  ) {
    return this.moduleDefService.overrideMainboardModuleDef(
      request.moduleId,
      request.moduleName,
    );
  }

  @post('/growbes/{id}/alarm/hardware')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  addHardwareAlarm(
    @param.path.string('id') mainboardId: string,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.addHardwareAlarm(mainboardId, alarm)
  }

  @post('/growbes/{id}/alarm/hardware/rm')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  removeHardwareAlarm(
    @param.path.string('id') mainboardId: string,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.removeHardwareAlarm(mainboardId, alarm)
  }

}
