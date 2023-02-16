import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

import { map, tap } from 'rxjs/operators';
import { GrowbeMainboardWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable, timer } from 'rxjs';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { DatePipe } from '@angular/common';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { ChangeReload, OnChangeReload } from 'src/app/helpers/onchangereload';


@Component({
    selector: 'app-growbe-state',
    templateUrl: './growbe-state.component.html',
    styleUrls: ['./growbe-state.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        DatePipe,
    ]
})
export class GrowbeStateComponent extends OnDestroyMixin(Object) implements OnChangeReload {

    lastMessageAt: number;

    lastMessageDiff$: Observable<string>;

    @Input() @ChangeReload() growbeId: string;

    growbe: Observable<GrowbeMainboardWithRelations>;

    constructor(
        private growbeApi: GrowbeMainboardAPI,
        private datePipe: DatePipe,
    ) {
        super();
    }

    reload(): void {
        if (!this.growbeId) {
          console.error("app-growbe-state missing required growbeId");
          return;
        }
        this.growbe = this.growbeApi.getById(this.growbeId).pipe(
          tap((growbe: GrowbeMainboardWithRelations) => {
            this.lastMessageAt = new Date(growbe.connectionInformation.lastUpdateAt).getTime();

            if (this.lastMessageDiff$) return;
            this.lastMessageDiff$ = timer(0, 1000).pipe(
              untilComponentDestroyed(this),
              map(() => {
                const diff = Date.now() - this.lastMessageAt;
                const date = new Date(0, 0, 0);
                date.setSeconds(diff / 1000);
                return this.datePipe.transform(date, 'mm:ss');
              })
            )

          })
        );
    }

}
