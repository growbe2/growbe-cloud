import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
  hasOne,
} from '@loopback/repository';
import {GrowbeSensorValue} from './growbe-sensor-value.model';
import {GrowbeMainboard} from './growbe-mainboard.model';
import {GrowbeModuleDef} from './growbe-module-def.model';
import {GrowbeLogs} from './growbe-logs.model';

@model()
export class GrowbeModule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property()
  connected: boolean;

  @property()
  readCount: number;

  @property()
  config?: any;

  @belongsTo(() => GrowbeMainboard)
  mainboardId: string;

  @property()
  atIndex: number;

  @hasMany(() => GrowbeSensorValue, {keyTo: 'moduleId'})
  growbeSensorValues: GrowbeSensorValue[];

  @hasOne(() => GrowbeModuleDef, {keyTo: 'moduleId'})
  moduleDef: GrowbeModuleDef;

  @hasMany(() => GrowbeLogs)
  growbeLogs: GrowbeLogs[];

  constructor(data?: Partial<GrowbeModule>) {
    super(data);
  }
}

export interface GrowbeModuleRelations {
  // describe navigational properties here
  moduleDef?: GrowbeModuleDef;
  mainboard?: GrowbeMainboard;
}

export type GrowbeModuleWithRelations = GrowbeModule & GrowbeModuleRelations;
