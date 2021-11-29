import {Entity, model, property} from '@loopback/repository';

@model()
export class GrowbeMainboardVersion extends Entity {

  @property({id: true, generated: true})
  id: number;

  @property()
  version: string;

  @property()
  release: Date;

  constructor(data?: Partial<GrowbeMainboardVersion>) {
    super(data);
  }
}

export interface GrowbeMainboardVersionRelations {
  // describe navigational properties here
}

export type GrowbeMainboardVersionWithRelations = GrowbeMainboardVersion & GrowbeMainboardVersionRelations;
