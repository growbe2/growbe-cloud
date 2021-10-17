import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import {
    OnDestroyMixin,
    untilComponentDestroyed,
} from '@berlingoqc/ngx-common';
import { filter } from 'rxjs/operators';
import { addPanelForm } from '../dashboard.form';
import { Dashboard } from '../dashboard.model';
import { DashboardService } from '../dashboard.service';

@Directive({})
export class BaseDashboardComponent<D extends Dashboard>
    extends OnDestroyMixin(Object)
    implements OnInit, OnDestroy {
    @Input() dashboard: D;
    newPanelForm: AutoFormData;

    constructor(protected dashboardService: DashboardService) {
      super();
    }

    ngOnInit(): void {
        this.dashboardService.dashboardSubject
            .asObservable()
            .pipe(
                untilComponentDestroyed(this),
                filter((d: Dashboard) => d.name === this.dashboard.name),
            )
            .subscribe((dashboard: D) => {
                this.dashboard = dashboard;
            });

        this.newPanelForm = addPanelForm(this.dashboardService, {
            dashboardId: this.dashboard.id,
        });
    }
}
