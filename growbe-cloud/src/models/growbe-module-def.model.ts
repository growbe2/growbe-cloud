import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<GrowbeModuleDef>) {
    super(data);
  }
}

export interface GrowbeModuleDefRelations {
  // describe navigational properties here
}

export type GrowbeModuleDefWithRelations = GrowbeModuleDef &
  GrowbeModuleDefRelations;
