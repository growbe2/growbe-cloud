import {Entity, model, property} from '@loopback/repository';

@model()
export class GrowbeWarningKey extends Entity {

  @property({id: true})
  key: string;

  @property()
  multi: boolean = false;

  constructor(data?: Partial<GrowbeWarningKey>) {
    super(data);
  }
}

export interface GrowbeWarningKeyRelations {
  // describe navigational properties here
}

export type GrowbeWarningKeyWithRelations = GrowbeWarningKey & GrowbeWarningKeyRelations;
