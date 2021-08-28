import { Component, Input, OnInit } from '@angular/core';
import { GrowbeModule } from 'growbe-cloud-api/lib';
import { of } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

@Component({
    selector: 'app-module-status-dot',
    templateUrl: './module-status-dot.component.html',
    styleUrls: ['./module-status-dot.component.scss'],
})
export class ModuleStatusDotComponent implements OnInit {
    @Input() moduleId: any;

    status;

    constructor(
      private growbeEventService: GrowbeEventService,
      private growbeModuleAPI: GrowbeModuleAPI,
    ) {}

    ngOnInit(): void {
        this.growbeModuleAPI.getById(this.moduleId).
          pipe(take(1)).subscribe((module: GrowbeModule) => {
            if (module) {
              this.status = this.growbeEventService
                  .getGrowbeEvent(
                      module.mainboardId,
                      `/cloud/m/${module.id}/state`,
                      JSON.parse,
                  )
                  .pipe(
                    startWith(module),
                    switchMap((data) => {
                      return this.growbeModuleAPI.requestFind.onModif(of(data))
                    })
                  );
            }
        })
    }
}
