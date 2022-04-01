import {Entity, model, property, belongsTo} from '@loopback/repository';

import * as pb from '@growbe2/growbe-pb';
import {GrowbeMainboard} from './growbe-mainboard.model';

@model()
export class VirtualRelay extends Entity {

  @property({id: true, generated: false})
  id: string;

  @property()
  relay: any | pb.VirtualRelay;

  @property()
  config?: any | pb.RelayOutletConfig;

  @property()
  state: boolean;
  
  @property()
  message: string;

  @belongsTo(() => GrowbeMainboard)
  growbeMainboardId: string;

  @property()
  updatedAt: Date;

  constructor(data?: Partial<VirtualRelay>) {
    super(data);
  }
}

export interface VirtualRelayRelations {
  // describe navigational properties here
}

export type VirtualRelayWithRelations = VirtualRelay & VirtualRelayRelations;
