import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@berlingoqc/auth';
import { envConfig } from '@berlingoqc/ngx-common';
import {
    Caching,
    LoopbackRestClientMixin,
    Resolving,
} from '@berlingoqc/ngx-loopback';
import { GrowbeDashboardWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Dashboard, DashboardItem, DashboardPanel } from 'src/app/dashboard/dashboard.model';
import { DashboardRef, DashboardService, PanelDashboardRef, PanelItemRef } from 'src/app/dashboard/dashboard.service';

@Injectable({ providedIn: 'root' })
export class GrowbeDashboardAPI extends Resolving(
    LoopbackRestClientMixin<GrowbeDashboardWithRelations>(),
) implements DashboardService {
    dashboardSubject = new Subject();

    constructor(httpClient: HttpClient, private authService: AuthService) {
        super(httpClient, '/dashboards');
        this.baseURL = envConfig.growbeCloud;
    }


  addPanelToDasboard(dashboard: DashboardRef, panel: DashboardPanel, element?: string): Observable<Dashboard> {
    return this.modifyDashboard(dashboard, (d: Dashboard) => {
      d.panels.push(panel);
      return d;
    });
  }

  addItemToPanelDashboard(panel: PanelDashboardRef, item: DashboardItem): Observable<Dashboard> {
    return this.modifyDashboard(panel, (d: Dashboard) => {
      const panelIndex = this.getPanelIndex(d, panel);
      d.panels[panelIndex].items.push(item);
      return d;
    });
  }

  removeItemFromPanel(item: PanelItemRef): Observable<Dashboard> {
     return this.modifyDashboard(item, (d: Dashboard) => {
      const panelIndex = this.getPanelIndex(d, item);
      const itemIndex = this.getItemPanelIndex(d.panels[panelIndex], item);
      d.panels[panelIndex].items.splice(itemIndex, 1);
      return d;
    });
  }

  removePanelFromDashboard(panel: PanelDashboardRef): Observable<Dashboard> {
    return this.modifyDashboard(panel, (d: Dashboard) => {
      const panelIndex = this.getPanelIndex(d, panel);
      d.panels.splice(panelIndex, 1);
      return d;
    })
  }

  removeDashboard(dashboard: DashboardRef): Observable<void> {
    return this.delete(dashboard.dashboardId);
  }


  getDashboards() {
    return this.get({
      where: {
        userId: this.authService.profile.id
      }
    }) as Observable<Dashboard[]>;
  }


  private getPanelIndex(dashboard: Dashboard, panel: PanelDashboardRef): number {
    return dashboard.panels.findIndex(x => x.name === panel.panelName);
  }

  private getItemPanelIndex(panel: DashboardPanel, item: PanelItemRef): number {
    return panel.items.findIndex(x => x.name == item.itemName);
  }

  private modifyDashboard(ref: DashboardRef, callback: (d: Dashboard) => Dashboard) {
    return this.getById(ref.dashboardId).pipe(
      switchMap(
        (dashboard: Dashboard) => {
          dashboard = callback(dashboard)
          this.dashboardSubject.next(dashboard);
          return this.updateById(ref.dashboardId, dashboard).pipe(map(() => dashboard))
        }
     )
    ) as Observable<Dashboard>;
  }
}
