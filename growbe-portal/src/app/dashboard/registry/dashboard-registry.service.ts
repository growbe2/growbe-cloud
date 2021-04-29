import { Injectable } from '@angular/core';
import { DashboardRegistryItem } from './dashboard.registry';

@Injectable()
export class DashboardRegistryService {
    private items: { [id: string]: DashboardRegistryItem } = {};

    addItem(item: DashboardRegistryItem) {
        this.items[item.component] = item;
    }

    getItem(component: string) {
        return this.items[component];
    }
}
