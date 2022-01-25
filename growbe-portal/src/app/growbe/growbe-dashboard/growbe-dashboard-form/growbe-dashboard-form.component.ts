import { Component,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@berlingoqc/auth';
import { fuseAnimations } from '@berlingoqc/fuse';
import { AutoFormData, IProperty, SelectComponent } from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeDashboardAPI } from '../../api/growbe-dashboard';

export const getDashboardFormProperties = (): IProperty[] => {
    return [
        {
            name: 'name',
            type: 'string',
            displayName: {
                type: 'string',
                content: 'Nom du dashboard',
            },
            required: true,
        },
        {
            name: 'layout',
            type: 'string',
            displayName: 'Composante de layout',
            component: {
              name: 'select',
              transformValue: (e) => e.id,
              options: {
                displayContent: (e) => e.name,
                value: of([
                  { name: 'Layout de project', id: 'project'},
                  { name: 'Layout complet', id: 'full'},
                ]),
              }
            } as SelectComponent,

        },
    ];
};

@Component({
    selector: 'app-growbe-dashboard-form',
    templateUrl: './growbe-dashboard-form.component.html',
    styleUrls: ['./growbe-dashboard-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GrowbeDashboardFormComponent {
    formData: AutoFormData = {
        type: 'simple',
        typeData: {
            direction: 'vertical',
            linear: true,
            labelPosition: 'start',
        },
        items: getDashboardFormProperties(),
        event: {
            submit: (data) =>
                this.dashboardAPI
                    .post({
                        name: data.name,
                        layout: data.layout,
                        userId: this.authService.profile.id,
                        panels: [],
                    })
                    .pipe(
                        map((item: any) => {
                            this.router.navigate(['/', 'dashboard', item.id]);
                            return item;
                        }),
                    ),
        },
    };

    constructor(
        private dashboardAPI: GrowbeDashboardAPI,
        private router: Router,
        private authService: AuthService,
    ) {}
}
