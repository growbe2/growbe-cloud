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

  @property()
  moduleType: string;

  @property()
  moduleId: string;

  @belongsTo(() => GrowbeMainboard)
  growbeMainboardId: string;

  @property()
  createdAt: Date;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrowbeSensorValue>) {
    super(data);
  }
}

export interface GrowbeSensorValueRelations {
  // describe navigational properties here
}

export type GrowbeSensorValueWithRelations = GrowbeSensorValue & GrowbeSensorValueRelations;
