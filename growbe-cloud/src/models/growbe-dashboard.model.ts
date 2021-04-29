import {Entity, model, property, hasMany} from '@loopback/repository';

@model({settings: {strict: false}})
export class GrowbeDashboard extends Entity {
  // Define well-known properties here
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  userId: string;

  @property()
  name: string;

  [prop: string]: any;

  constructor(data?: Partial<GrowbeDashboard>) {
    super(data);
  }
}

export interface GrowbeDashboardRelations {
  // describe navigational properties here
}

export type GrowbeDashboardWithRelations = GrowbeDashboard &
  GrowbeDashboardRelations;
