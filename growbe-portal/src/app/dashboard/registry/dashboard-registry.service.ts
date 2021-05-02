import { Injectable, InjectionToken } from "@angular/core";
import { DashboardRegistryItem } from "./dashboard.registry";



export const DASHBOARDS_ITEM_DEFAULT = new InjectionToken<DashboardRegistryItem[]>('dashboards_item');



@Injectable()
export class DashboardRegistryService {
  private items: { [id:string]: DashboardRegistryItem} = {};


  addItem(item: DashboardRegistryItem) {
    this.items[item.component] = item;
  }

  getItem(component: string) {
    return this.items[component];
  }
}
