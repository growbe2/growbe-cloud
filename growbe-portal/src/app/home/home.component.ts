import { Component, OnInit } from '@angular/core';
import { AuthService } from '@berlingoqc/auth';
import { envConfig } from '@berlingoqc/ngx-common';
import { Dashboard, DashboardService } from '@growbe2/growbe-dashboard';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { GrowbeDashboardAPI } from '../growbe/api/growbe-dashboard';
import { GrowbeMainboardAPI } from '../growbe/api/growbe-mainboard';
import { GrowbeModuleAPI } from '../growbe/api/growbe-module';
import { UserPreferenceService } from '../service/user-preference.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    defaultDashboard: Dashboard;

    dashboard$: Observable<Dashboard>;

    constructor(
      public authService: AuthService,
      private userPrefService: UserPreferenceService,
      private dashboardService: GrowbeDashboardAPI,
      private growbeMainboardAPI: GrowbeMainboardAPI,
      private moduleService: GrowbeModuleAPI,
    ) {}

    ngOnInit(): void {
      this.growbeMainboardAPI.baseURL = envConfig.growbeCloud;
      this.dashboardService.baseURL = envConfig.growbeCloud;
      this.moduleService.baseURL = envConfig.growbeCloud;
      this.dashboard$ = this.userPrefService.preference$.asObservable().pipe(
        filter((x) => x !== null),
        switchMap((pref) => this.dashboardService.getDashboard(pref.homeDashboard))
      )
    }
}
