import {Entity, model, property, belongsTo} from '@loopback/repository';

import * as pb from '@growbe2/growbe-pb';
import {GrowbeMainboard} from './growbe-mainboard.model';

@model()
export class VirtualRelay extends Entity {

  @property({id: true, generated: true})
  id: number;

  @property()
  relay: any | pb.VirtualRelay;

  @property()
  config?: any | pb.RelayOutletConfig;

  @belongsTo(() => GrowbeMainboard)
  growbeMainboardId: string;

  constructor(data?: Partial<VirtualRelay>) {
    super(data);
  }
}

export interface VirtualRelayRelations {
  // describe navigational properties here
}

export type VirtualRelayWithRelations = VirtualRelay & VirtualRelayRelations;
