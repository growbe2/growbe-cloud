import { FieldAlarmEvent } from '@growbe2/growbe-pb';
import {Entity, model, property} from '@loopback/repository';

@model()
export class GrowbeHardwareAlarmEvent extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  moduleId: string;

  @property()
  mainboardId: string;

  @property()
  property: string;

  @property()
  createdAt: number;

  @property({type: 'any'})
  event: FieldAlarmEvent;

  constructor(data?: Partial<GrowbeHardwareAlarmEvent>) {
    super(data);
  }
}

export interface GrowbeHardwareAlarmEventRelations {
  // describe navigational properties here
}

export type GrowbeHardwareAlarmEventWithRelations = GrowbeHardwareAlarmEvent & GrowbeHardwareAlarmEventRelations;
