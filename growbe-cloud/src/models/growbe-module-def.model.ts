import {Entity, model, property} from '@loopback/repository';

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
  properties: any; // bug de parsing PropertiesModules thx lb4

  constructor(data?: Partial<GrowbeModuleDef>) {
    super(data);
  }
}

export interface GrowbeModuleDefRelations {
  // describe navigational properties here
}

export type GrowbeModuleDefWithRelations = GrowbeModuleDef &
  GrowbeModuleDefRelations;
