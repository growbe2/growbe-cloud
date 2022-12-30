import {service} from "@loopback/core";
import {param, post, requestBody} from "@loopback/rest";
import {VirtualComboardService} from "../../services";
import {authorizeGrowbe} from "../authorization";

import pb from '@growbe2/growbe-pb';



export class VirtualComboardController {
  constructor(
    @service(VirtualComboardService)
    private virtualComboardService: VirtualComboardService,
  ) {}

  @post('/growbes/{id}/virtualComboard/item')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  sendVirtualComboardItem(
    @param.path.string("id") growbeId: string,
    @param.query.boolean("direct") direct: boolean,
    @requestBody() config: pb.VirtualScenarioItems,
  ) {
    return this.virtualComboardService.sendVirtualComboardItem(growbeId, config, direct);
  }

  @post('/growbes/{id}/virtualComboard/data')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  sendVirtualComboardData(
    @param.path.string("id") growbeId: string,
    @param.query.boolean("direct") direct: boolean,
    @requestBody() config: { item: pb.VirtualScenarioItem, data: any[] },
  ) {
    return this.virtualComboardService.sendVirtualComboardData(growbeId, config.item, config.data, direct);
  }
}
