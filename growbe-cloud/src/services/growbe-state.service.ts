import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';

import { HearthBeath } from '@growbe2/growbe-pb';
import { GrowbeService } from './growbe.service';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeStateService {
  constructor(
    @service(GrowbeService) public growbeService: GrowbeService,
  ) {}

  async onBeath(id: string, beath: HearthBeath) {
    console.log('Beath from', id, beath);
    const mainboard = await this.growbeService.findOrCreate(id);
    return this.growbeService.mainboardRepository.updateById(id, {lastUpdateAt: beath})
  }
}
