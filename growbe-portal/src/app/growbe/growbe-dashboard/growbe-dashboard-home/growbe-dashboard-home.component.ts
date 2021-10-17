import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@berlingoqc/fuse';
import { GrowbeDashboardWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { UserPreferenceService } from 'src/app/service/user-preference.service';

@Component({
    selector: 'app-growbe-dashboard-home',
    templateUrl: './growbe-dashboard-home.component.html',
    styleUrls: ['./growbe-dashboard-home.component.scss'],
    animations: fuseAnimations,
})
export class GrowbeDashboardHomeComponent implements OnInit {
    data: GrowbeDashboardWithRelations;

    pref$: Observable<any>;

    constructor(
      private activatedRoute: ActivatedRoute,
      private userPrefService: UserPreferenceService,
    ) {}

    ngOnInit(): void {
        this.data = this.activatedRoute.snapshot.data.dashboard;
        this.pref$ = this.userPrefService.preference$.asObservable();
    }

    onMakeFavorite(preference: any, boardName: string): void {
      if (preference.homeDashboard === boardName) {
        preference.homeDashboard = null;
      } else {
        preference.homeDashboard = boardName;
      }
      this.userPrefService.update(preference).subscribe(() => {})
    }
}
