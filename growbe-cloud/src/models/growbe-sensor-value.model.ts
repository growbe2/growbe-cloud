import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class GrowbeSensorValue extends Entity {
  // Define well-known properties here
  @property({type: 'string', id: true, generated: true})
  id: string

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
