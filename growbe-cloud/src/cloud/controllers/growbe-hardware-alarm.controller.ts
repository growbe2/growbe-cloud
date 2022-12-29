
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


  @get('/growbes/{mainboardId}/modules/{id}/alarm/hardware/event')
  @authorizeGrowbe({
      growbeIdIndex: 0,
      getFunc: getMainboardByModule,
  })
  getHardwareAlarmEvent(
    @param.path.string('id') moduleId: string,
    @param.path.string('mainboardId') mainboardId: string,
  ) {
    return this.growbeHardwareAlarmService.getHardwareAlarmEvent(mainboardId, moduleId);
  }


  @get('/growbes/{mainboardId}/modules/{id}/alarm/hardware/{property}/event')
  @authorizeGrowbe({
      growbeIdIndex: 0,
      getFunc: getMainboardByModule,
  })
  getHardwareAlarmEventProperty(
    @param.path.string('id') moduleId: string,
    @param.path.string('mainboardId') mainboardId: string,
    @param.path.string('property') property: string,
  ) {
    return this.growbeHardwareAlarmService.getHardwareAlarmEvent(mainboardId, moduleId, property);
  }

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
    @param.query.boolean('direct') direct: boolean,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.addHardwareAlarm(mainboardId, alarm, direct)
  }

  @put('/growbes/{mainboardId}/modules/{id}/alarm/hardware/{property}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    getFunc: getMainboardByModule,
  })
  updateHardwareAlarm(
    @param.path.string('mainboardId') mainboardId: string,
    @param.query.boolean('direct') direct: boolean,
    @requestBody() alarm: FieldAlarm
  ) {
    return this.growbeHardwareAlarmService.updateHardwareAlarm(mainboardId, alarm, direct)
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
    @param.query.boolean('direct') direct: boolean,
  ) {
    return this.growbeHardwareAlarmService.removeHardwareAlarm(mainboardId, {
      moduleId,
      property
    } as FieldAlarm, direct);
  }

}


