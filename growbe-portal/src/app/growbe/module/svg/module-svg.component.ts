import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { OnDestroyMixin } from "@berlingoqc/ngx-common";
import { BaseDashboardComponent } from "@growbe2/growbe-dashboard";
import {GrowbeModuleWithRelations} from "@growbe2/ngx-cloud-api";
import { Observable } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { isDateOutdated } from "src/app/shared/dated-value/outdated-value/outdated-value.component";
import { GrowbeModuleAPI } from "../../api/growbe-module";
import { GrowbeEventService } from "../../services/growbe-event.service";
import {GrowbeGraphService} from "../graph/service/growbe-graph.service";


@Component({
  selector: 'growbe-module-svg',
  template: `
    <ng-container *ngIf="data | async as d">
    <ng-container [ngSwitch]="moduleId?.slice(0,3)">
      <app-soil-module *ngSwitchCase="'AAS'" [mainboardId]="mainboardId" [connected]="connected | async" [moduleId]="moduleId" [isOutdated]="isOutdated" [data]="d"></app-soil-module>
      <app-thl-module *ngSwitchCase="'AAA'" [mainboardId]="mainboardId" [connected]="connected | async" [moduleId]="moduleId" [isOutdated]="isOutdated" [data]="d"></app-thl-module>
      <app-wc-module *ngSwitchDefault [mainboardId]="mainboardId" [connected]="connected | async" [isOutdated]="isOutdated" [moduleId]="moduleId" [data]="d"></app-wc-module>
    </ng-container>

    <app-outdated-value *ngIf="d.createdAt" [connected]="connected | async" [createdAt]="d.createdAt"></app-outdated-value>

    </ng-container>
  `,
})
export class ModuleSVGComponent extends OnDestroyMixin(BaseDashboardComponent) implements OnInit {
  @Input() mainboardId: string;
  @Input() moduleId: string;

  @Input() displayDate: boolean = true;

  isOutdated: boolean;
  data: Observable<any>;

  extraProperties: string[];

  connected: Observable<boolean>;

  constructor(
    private moduleAPI: GrowbeModuleAPI,
    private graphService: GrowbeGraphService,
  ) {
    super();
  }

  ngOnInit(): void {
      // TODO do something better , centralize all module config
      if (this.moduleId[2] === 'S') {
        this.extraProperties = ['valuetype'];
      }
      this.connected = this.moduleAPI.getById(this.moduleId).pipe(
        map((m: GrowbeModuleWithRelations) => m.connected)
      );
      this.data = this.moduleAPI.moduleDef(this.moduleId).get().pipe(
        switchMap((moduleDef: any) => this.graphService.getModuleDataLive(this.mainboardId, this.moduleId, [...Object.keys(moduleDef.properties), ...(this.extraProperties || [])])),
        tap((data) => {
          this.loadingEvent.next(null);
          this.isOutdated = isDateOutdated(data.createdAt, 60 * 1000);
        }),
        catchError((err) => {
          this.loadingEvent.next({error: err})
          throw err;
        })
      )
  }
}
