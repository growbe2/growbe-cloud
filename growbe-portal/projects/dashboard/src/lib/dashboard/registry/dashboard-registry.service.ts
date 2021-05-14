import { Injectable, InjectionToken } from "@angular/core";
import { DashboardRegistryItem } from "./dashboard.registry";



export const DASHBOARDS_ITEM_DEFAULT = new InjectionToken<DashboardRegistryItem[]>('dashboards_item');


const items: { [id:string]: DashboardRegistryItem} = {};

@Injectable()
export class DashboardRegistryService {

  addItem(item: DashboardRegistryItem) {
    items[item.component] = item;
  }

  getItem(component: string) {
    return items[component];
  }
}
