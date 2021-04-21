import { Route } from "@angular/compiler/src/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestModuleMetadata } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EnvConfigurationService, setEnvConfig } from '@berlingoqc/ngx-common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GrowbeDashboardAPI } from "../growbe/api/growbe-dashboard";
import { GrowbeMainboardAPI } from "../growbe/api/growbe-mainboard";
import { GrowbeModuleAPI } from "../growbe/api/growbe-module";
import { GrowbeStreamAPI } from "../growbe/api/growbe-stream";
import { GrowbeWarningAPI } from "../growbe/api/growbe-warning";
import { of } from "rxjs";
import {GrowbeGraphService} from '../growbe/module/graph/service/growbe-graph.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


export function getTestModuleMetadata(config: { data?: TestModuleMetadata, routes?: Route[]}): TestModuleMetadata {
  setEnvConfig({});
  return {
    declarations: [
      ...(config.data?.declarations ?? [])
    ],
    imports: [
      NoopAnimationsModule,
      HttpClientTestingModule,
      RouterTestingModule.withRoutes(config.routes ?? []),
      ...(config.data?.imports ?? [])
    ],
    providers: [
      GrowbeDashboardAPI,
      GrowbeMainboardAPI,
      GrowbeGraphService,
      GrowbeModuleAPI,
      GrowbeStreamAPI,
      GrowbeWarningAPI,
      ...(config.data?.providers ?? []),
    ],
    schemas: [
      NO_ERRORS_SCHEMA,
      ...(config.data?.schemas ?? [])
    ]
  }

}
