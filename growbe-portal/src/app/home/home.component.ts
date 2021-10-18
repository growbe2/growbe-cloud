import { Component, OnInit } from '@angular/core';
import { AuthService } from '@berlingoqc/auth';
import { Dashboard } from '@growbe2/growbe-dashboard';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GrowbeDashboardAPI } from '../growbe/api/growbe-dashboard';
import { GrowbeDashboardRegistry } from '../growbe/growbe-dashboard/items';
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
      private dashboardRegistry: GrowbeDashboardRegistry,
      private dashboardService: GrowbeDashboardAPI,
    ) {}

    ngOnInit(): void {
      this.dashboard$ = this.userPrefService.preference$.asObservable().pipe(
        filter((x) => x !== null),
        switchMap((pref) => this.dashboardService.getDashboard(pref.homeDashboard)),
        map((dashboard) => this.dashboardRegistry.modifyDashboardForDisplay(dashboard))
      );
    }
}
