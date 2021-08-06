import { FieldAlarm } from '@growbe2/growbe-pb';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {GrowbeMainboard} from './growbe-mainboard.model';

@model()
export class Range {
  @property()
  min: number;
  @property()
  max: number;
}
@model()
export class PropertyModule {
  @property()
  name: string;
  @property({jsonSchema: {nullable: true}})
  displayName?: string;
  @property()
  definition: string;
  @property()
  unit: string;
  @property()
  operationalRange?: Range;
  @property()
  alarm: FieldAlarm;
}

@model({settings: {strict: false}})
export class PropertiesModule {
  [id: string]: PropertyModule;
}

@model()
export class GrowbeModuleDef extends Entity {
  @property({id: true, generated: false})
  id: string;

  @property({jsonSchema: {nullable: true}})
  displayName?: string;

  @property()
  name: string;

  @property()
  description: string;

  @property()
  pbModelName: string;

  @property()
  pbModelConfig: string;

  @property()
  properties: any;

  @belongsTo(() => GrowbeMainboard)
  mainboardId: string;

  constructor(data?: Partial<GrowbeModuleDef>) {
    super(data);
  }
}

export interface GrowbeModuleDefRelations {
  // describe navigational properties here
  mainboard?: GrowbeMainboard;
}

export type GrowbeModuleDefWithRelations = GrowbeModuleDef &
  GrowbeModuleDefRelations;
