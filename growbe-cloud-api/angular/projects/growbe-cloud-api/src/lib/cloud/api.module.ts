import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { GrowbeDashboardControllerService } from './api/growbeDashboardController.service';
import { GrowbeMainboardControllerService } from './api/growbeMainboardController.service';
import { GrowbeModuleControllerService } from './api/growbeModuleController.service';
import { GrowbeModuleDefControllerService } from './api/growbeModuleDefController.service';
import { GrowbeSensorValueControllerService } from './api/growbeSensorValueController.service';
import { GrowbeWarningControllerService } from './api/growbeWarningController.service';
import { PingControllerService } from './api/pingController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
