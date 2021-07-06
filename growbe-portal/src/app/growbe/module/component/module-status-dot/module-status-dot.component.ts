import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

@Component({
    selector: 'app-module-status-dot',
    templateUrl: './module-status-dot.component.html',
    styleUrls: ['./module-status-dot.component.scss'],
})
export class ModuleStatusDotComponent implements OnInit {
    @Input() module: any;

    status;

    constructor(
      private growbeEventService: GrowbeEventService,
      private growbeModuleAPI: GrowbeModuleAPI,
    ) {}

    ngOnInit(): void {
        if (this.module) {
            this.status = this.growbeEventService
                .getGrowbeEvent(
                    this.module.mainboardId,
                    `/cloud/m/${this.module.uid}/state`,
                    JSON.parse,
                )
                .pipe(
                  startWith(this.module),
                  switchMap((data) => {
                    return this.growbeModuleAPI.requestFind.onModif(of(data))
                  })
                );
        }
    }
}
