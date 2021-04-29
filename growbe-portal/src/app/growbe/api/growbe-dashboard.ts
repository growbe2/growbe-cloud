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
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Dashboard } from 'src/app/dashboard/dashboard.model';
import {
    AddItemToPanelRequest,
    DashboardService,
} from 'src/app/dashboard/dashboard.service';

@Injectable({ providedIn: 'root' })
export class GrowbeDashboardAPI
    extends Resolving(LoopbackRestClientMixin<GrowbeDashboardWithRelations>())
    implements DashboardService {
    constructor(httpClient: HttpClient, private authService: AuthService) {
        super(httpClient, '/dashboards');
        this.baseURL = envConfig.growbeCloud;
    }

    getDashboards() {
        return this.get({
            where: {
                userId: this.authService.profile.id,
            },
        }) as Observable<Dashboard[]>;
    }

    addPanelToDasboard(data: AddItemToPanelRequest) {
        return this.getById(data.dashboardId).pipe(
            switchMap((dashboard) =>
                this.updateById(data.dashboardId, dashboard).pipe(
                    map(() => dashboard),
                ),
            ),
        ) as Observable<Dashboard>;
    }
}
