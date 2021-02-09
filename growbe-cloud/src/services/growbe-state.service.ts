import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';

import { HearthBeath } from '@growbe2/growbe-pb';
import { GrowbeService } from './growbe.service';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeStateService {
  constructor(
    @service(GrowbeService) public growbeService: GrowbeService,
  ) {}

  async onBeath(id: string, beath: HearthBeath) {
    console.log('Beath from', id);
    const mainboard = await this.growbeService.findOrCreate(id);
    mainboard.lastUpdateAt = new Date();
    return this.growbeService.mainboardRepository.save(mainboard);
  }
}
