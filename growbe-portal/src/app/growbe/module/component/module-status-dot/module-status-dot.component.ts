import { Component, Input, OnInit } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { GrowbeModule } from 'growbe-cloud-api/lib';
import { of } from 'rxjs';
import { startWith, switchMap, take, tap } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

@Component({
  selector: 'app-module-status-dot',
  templateUrl: './module-status-dot.component.html',
  styleUrls: ['./module-status-dot.component.scss'],
})
export class ModuleStatusDotComponent extends OnDestroyMixin(Object) implements OnInit {
  @Input() mainboardId: string;
  @Input() moduleId: string;

  status;

  constructor(
    private growbeEventService: GrowbeEventService,
    private growbeModuleAPI: GrowbeModuleAPI,
  ) {
    super();
  }

  ngOnInit(): void {
    this.growbeModuleAPI.getById(this.moduleId).pipe(take(1)).subscribe((module: any) => {
      this.status = module.connected;
    });
    this.growbeEventService
      .getGrowbeEvent(
        this.mainboardId,
        `/cloud/m/${this.moduleId}/state`,
        JSON.parse,
      ).subscribe((state) => {
        this.status = state.connected;
      })
  }
}
