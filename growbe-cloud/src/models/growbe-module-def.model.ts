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
  @property()
  definition: string;
  @property()
  unit: string;
  @property()
  operationalRange?: Range;
}

@model()
export class GrowbeModuleDef extends Entity {
  @property({id: true, generated: false})
  id: string;

  @property()
  name: string;

  @property()
  description: string;

  @property()
  pbModelName: string;

  @property.array(() => PropertyModule)
  properties: PropertyModule[];

  constructor(data?: Partial<GrowbeModuleDef>) {
    super(data);
  }
}

export interface GrowbeModuleDefRelations {
  // describe navigational properties here
}

export type GrowbeModuleDefWithRelations = GrowbeModuleDef &
  GrowbeModuleDefRelations;
