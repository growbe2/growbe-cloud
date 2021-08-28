import { Type } from '@angular/core';
import { InputProperty, IProperty } from '@berlingoqc/ngx-autoform';

export interface DashboardRegistryItem {
    name: string;
    component: string;
    componentType: Type<any>;
    description?: string;

    inputs?: {
        [id: string]: IProperty;
    };

    outputs?: {
        [id: string]: InputProperty;
    };
}
