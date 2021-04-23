import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@berlingoqc/auth';
import { fuseAnimations } from '@berlingoqc/fuse';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { GrowbeDashboard } from '@growbe2/ngx-cloud-api';
import { GrowbeDashboardAPI } from '../../api/growbe-dashboard';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';

@Component({
  selector: 'app-growbe-dashboard-form',
  templateUrl: './growbe-dashboard-form.component.html',
  styleUrls: ['./growbe-dashboard-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class GrowbeDashboardFormComponent implements OnInit {

  formData: AutoFormData = {
    type: 'simple',
    typeData: {
      direction: 'vertical',
      linear: true,
      labelPosition: 'start'
    },
    items: [
      {
        type: 'object',
        name: 'dashboard',
        properties: [
          {
            name: 'name',
            type: 'string',
            displayName: {
              type: 'string',
              content: 'Nom du dashboard'
            },
            required: true,
          }
        ]
      }
    ],
    onSubmitValid: (d) => this.onSubmit(d)
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardAPI: GrowbeDashboardAPI,
    private bAPI: GrowbeMainboardAPI,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    console.log(this.authService);
    this.dashboardAPI.post({name: data.dashboard.name, userId: this.authService.profile.id}).subscribe((item: GrowbeDashboard) => {
      console.log(item);
      this.router.navigate(['/', 'dashboard', item.id]);
    });
  }

}
