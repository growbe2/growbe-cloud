
import {FieldAlarm} from '@growbe2/growbe-pb';
import {service} from '@loopback/core';
import {get, del, param, put, post, requestBody} from '@loopback/openapi-v3';
import {GrowbeHardwareAlarmService} from '../../services';
import {authorizeGrowbe, getMainboardByModule} from '../authorization';

export class GrowbeHardwareAlarmController {
  constructor(
    @service(GrowbeHardwareAlarmService)
    private growbeHardwareAlarmService: GrowbeHardwareAlarmService,
  ) {}

  @get('/growbes/{mainboardId}/modules/{id}/alarm/hardware')
  @authorizeGrowbe({
      growbeIdIndex: 0,
      getFunc: getMainboardByModule,
  })
  getHardwareAlarm(
    @param.path.string('id') moduleId: string,
  ) {
    return this.growbeHardwareAlarmService.getModuleHardwareAlarms(moduleId);
  }

  @post('/growbes/{mainboardId}/modules/{id}/alarm/hardware')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  addHardwareAlarm(
    @param.path.string('mainboardId') mainboardId: string,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.addHardwareAlarm(mainboardId, alarm)
  }

  @put('/growbes/{mainboardId}/modules/{id}/alarm/hardware/{property}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  updateHardwareAlarm(
    @param.path.string('mainboardId') mainboardId: string,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.updateHardwareAlarm(mainboardId, alarm)
  }

  @del('/growbes/{mainboardId}/modules/{id}/alarm/hardware/{property}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  removeHardwareAlarm(
    @param.path.string('mainboardId') mainboardId: string,
    @param.path.string('id') moduleId: string,
    @param.path.string('property') property: string,
  ) {
    return this.growbeHardwareAlarmService.removeHardwareAlarm(mainboardId, {
      moduleId,
      property
    } as FieldAlarm)
  }

}


