import {FieldAlarm} from '@growbe2/growbe-pb';
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
