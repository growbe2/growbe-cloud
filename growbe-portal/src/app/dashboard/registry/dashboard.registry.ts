import { Type } from '@angular/core';

export interface InputProperty {
    type: string;
}

export interface DashboardRegistryItem {
    name: string;
    component: string;
    componentType: Type<any>;

    inputs: {
        [id: string]: InputProperty;
    };
}
