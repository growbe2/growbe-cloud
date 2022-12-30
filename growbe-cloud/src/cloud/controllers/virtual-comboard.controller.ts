import {service} from "@loopback/core";
import {param, post, requestBody} from "@loopback/rest";
import {VirtualComboardItem, VirtualComboardService} from "../../services";
import {authorizeGrowbe} from "../authorization";




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
    @requestBody() config: VirtualComboardItem[],
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
    @requestBody() config: { item: VirtualComboardItem, data: any[] },
  ) {
    return this.virtualComboardService.sendVirtualComboardData(growbeId, config.item, config.data, direct);
  }
}
