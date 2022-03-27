import {FieldAlarm, FieldAlarmEvent} from '@growbe2/growbe-pb';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {GrowbeModule} from './growbe-module.model';

@model()
export class GrowbeHardwareAlarm extends Entity {
  @property({id: true, generated: true})
  id: number;

  @property({
    type: 'any'
  })
  alarms: { [id: string]: FieldAlarm };

  // TODO maybe change to something better to store it,
  // will use log for history and this for accessing quickly the last
  // time
  @property({
    type: 'any'
  })
  state: { [id: string]: FieldAlarmEvent};

  @belongsTo(() => GrowbeModule)
  moduleId: string;

  constructor(data?: Partial<GrowbeHardwareAlarm>) {
    super(data);
  }
}

export interface GrowbeHardwareAlarmRelations {
  // describe navigational properties here
}

export type GrowbeHardwareAlarmWithRelations = GrowbeHardwareAlarm & GrowbeHardwareAlarmRelations;
