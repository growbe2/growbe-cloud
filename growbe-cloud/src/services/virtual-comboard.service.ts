import {ActionCode, SOILModuleData, THLModuleData} from "@growbe2/growbe-pb";
import {BindingScope, injectable, service} from "@loopback/core";
import {GrowbeActionService} from "./growbe-action.service";


export class VirtualComboardItem {
  event_type: 'value' | 'state';
  port: number;
  id: string;
  state?: boolean;
  buffer?: number[];
  return_index?: number;
  timeout?: number;
}


function from_aaa(aaa: THLModuleData) {
  let airTemperature = Buffer.from(`${aaa.airTemperature.toFixed(2)}`, 'ascii');
  let spacer_1 = Array.from({ length: 100 - 5 }, () => 0);
  let humidity = Buffer.from(`${aaa.humidity.toFixed(2)}`, 'ascii');

  let total = [...airTemperature, ...spacer_1, ...humidity];

  return total;
}

function from_aas(aas: SOILModuleData) {
  let buffer: number[] = [];
  const map_field = (value: number) => {
    buffer.push(...[(value >> 8), (value & 0xff)], 0, 0,0,0,0,0,0,0);
  };
  map_field(aas.p0);
  map_field(aas.p1);
  map_field(aas.p2);
  map_field(aas.p3);
  map_field(aas.p4);
  map_field(aas.p5);
  map_field(aas.p6);
  map_field(aas.p7);

  return buffer;
}

function from_module_data(moduleType: string, value: any) {
  switch (moduleType) {
    case "AAA":
      return from_aaa(value);
    case "AAS":
      return from_aas(value);
  }
}

@injectable({scope: BindingScope.TRANSIENT})
export class VirtualComboardService {

  constructor(
    @service(GrowbeActionService)
    private actionService: GrowbeActionService
  ) {}


  sendVirtualComboardData(growbeId: string, item: VirtualComboardItem, values: any[]) {
    let items = values.map(value => {
      let moduleType = item.id.substring(0, 3);
      return Object.assign(item, from_module_data(moduleType, value));
    });

    return this.actionService.sendRequest({
      growbeId,
      topic: '/board/virt/item',
      payload: JSON.stringify(items),
      responseCode: ActionCode.SYNC_REQUEST,
    });
  }

  sendVirtualComboardItem(growbeId: string, items: VirtualComboardItem[]) {
    return this.actionService.sendRequest({
      growbeId,
      topic: '/board/virt/item',
      payload: JSON.stringify(items),
      responseCode: ActionCode.SYNC_REQUEST,
    });

  }
}
