import {Entity, model, property} from '@loopback/repository';
import {GrowbeState} from './growbe-mainboard.model';

@model()
export class GrowbeMainboardConnectionInformation extends Entity {
  @property({id: true, generated: true})
  id: number;

  @property()
  lastUpdateAt: Date;

  @property({type: 'string'})
  state: GrowbeState;

  @property({
    type: 'string',
  })
  growbeMainboardId?: string;

  constructor(data?: Partial<GrowbeMainboardConnectionInformation>) {
    super(data);
  }
}

export interface GrowbeMainboardConnectionInformationRelations {
  // describe navigational properties here
}

export type GrowbeMainboardConnectionInformationWithRelations = GrowbeMainboardConnectionInformation & GrowbeMainboardConnectionInformationRelations;
