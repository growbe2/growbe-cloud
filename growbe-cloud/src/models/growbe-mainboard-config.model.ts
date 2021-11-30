import {Entity, model, property} from '@loopback/repository';

import pb from '@growbe2/growbe-pb';

@model()
export class GrowbeMainboardConfig extends Entity {
  @property({id: true, generated: true})
  id: number;

  @property()
  config: any | pb.GrowbeMainboardConfig;

  @property()
  localConnection: any | pb.LocalConnection;

  @property({
    type: 'string',
  })
  growbeMainboardId?: string;

  constructor(data?: Partial<GrowbeMainboardConfig>) {
    super(data);
  }
}

export interface GrowbeMainboardConfigRelations {
  // describe navigational properties here
}

export type GrowbeMainboardConfigWithRelations = GrowbeMainboardConfig &
  GrowbeMainboardConfigRelations;
