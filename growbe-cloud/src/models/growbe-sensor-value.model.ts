import {Entity, model, property, belongsTo} from '@loopback/repository';
import {GrowbeMainboard} from './growbe-mainboard.model';

@model({settings: {strict: false}})
export class GrowbeSensorValue extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property({description: 'type of the module ex: AAB'})
  moduleType: string;

  @property()
  moduleId: string;

  @belongsTo(() => GrowbeMainboard)
  growbeMainboardId: string;

  @property({description: 'starting point of the growbe sensor value document'})
  createdAt: Date;

  @property({description: 'ending point of the growbe sensor value document'})
  endingAt: Date;

  @property({description: 'last value'})
  values: {[prop: string]: any};
  
  @property({description: 'historic of data during this minutes'})
  samples: any;

  constructor(data?: Partial<GrowbeSensorValue>) {
    super(data);
  }
}

export interface GrowbeSensorValueRelations {
  // describe navigational properties here
}

export type GrowbeSensorValueWithRelations = GrowbeSensorValue &
  GrowbeSensorValueRelations;
