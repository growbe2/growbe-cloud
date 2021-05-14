import { NgModule } from '@angular/core';
import {
    DashboardModule,
    DashboardRegistryService,
} from '@growbe2/growbe-dashboard';
import { GreenhouseComponent } from './greenhouse.component';

@NgModule({
    declarations: [GreenhouseComponent],
    imports: [DashboardModule],
    exports: [GreenhouseComponent],
})
export class GreenhouseModule {
    constructor(registry: DashboardRegistryService) {
        console.log('ELEMENT', registry);

        registry.addItem({
            name: 'greenhouse',
            component: 'greenhouse',
            componentType: GreenhouseComponent,
        });
    }
}
