import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {GrowbeSensorValue} from './growbe-sensor-value.model';
import {GrowbeMainboard} from './growbe-mainboard.model';
import {GrowbeModuleDef} from './growbe-module-def.model';

@model({settings: {strict: false}})
export class GrowbeModule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  uid: string;

  @property()
  connected: boolean;
  
  @property()
  readCount: number;

  @hasMany(() => GrowbeSensorValue, {keyTo: 'moduleId'})
  growbeSensorValues: GrowbeSensorValue[];

  @belongsTo(() => GrowbeMainboard)
  mainboardId: string;

  @belongsTo(() => GrowbeModuleDef, {name: 'moduleDef', keyTo: 'id'})
  moduleName: string;

  [prop: string]: any;

  constructor(data?: Partial<GrowbeModule>) {
    super(data);
  }
}

export interface GrowbeModuleRelations {
  // describe navigational properties here
  moduleDef?: GrowbeModuleDef;
}

export type GrowbeModuleWithRelations = GrowbeModule & GrowbeModuleRelations;
