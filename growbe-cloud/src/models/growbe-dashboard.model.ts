import {Entity, model, property, hasMany} from '@loopback/repository';
import {GrowbeDashboardItem} from './growbe-dashboard-item.model';

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

  @hasMany(() => GrowbeDashboardItem)
  growbeDashboardItems: GrowbeDashboardItem[];

  @property()
  name: string;

  @property.array(GrowbeDashboardItem)
  sidePanel: GrowbeDashboardItem[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrowbeDashboard>) {
    super(data);
  }
}

export interface GrowbeDashboardRelations {
  // describe navigational properties here
}

export type GrowbeDashboardWithRelations = GrowbeDashboard & GrowbeDashboardRelations;
