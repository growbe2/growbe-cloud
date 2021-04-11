import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class GrowbeStream extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  growbeMainboardId: string;

  @property()
  streamName: string;

  @property()
  active: boolean;

  @property()
  expiredAt: number;

  @property()
  url: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrowbeStream>) {
    super(data);
  }
}

export interface GrowbeStreamRelations {
  // describe navigational properties here
}

export type GrowbeStreamWithRelations = GrowbeStream & GrowbeStreamRelations;
