import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class GrowbeDashboardItem extends Entity {

  // Define well-known properties here
  @property({
    type: 'string',
  })
  growbeDashboardId?: string;
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string

  @property()
  name: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrowbeDashboardItem>) {
    super(data);
  }
}

export interface GrowbeDashboardItemRelations {
  // describe navigational properties here
}

export type GrowbeDashboardItemWithRelations = GrowbeDashboardItem & GrowbeDashboardItemRelations;
