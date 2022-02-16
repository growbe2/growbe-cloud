import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

import * as pb from '@growbe2/growbe-pb';
import { map, take } from 'rxjs/operators';
import { GrowbeMainboard } from '@growbe2/ngx-cloud-api';
import { interval, Observable, Subscription } from 'rxjs';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-growbe-state',
    templateUrl: './growbe-state.component.html',
    styleUrls: ['./growbe-state.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        DatePipe,
    ]
})
export class GrowbeStateComponent extends OnDestroyMixin(Object) implements OnInit {

    lastMessageAt: number;


    lastMessageDiff$: Observable<string>;

    @Input() set growbe(g: GrowbeMainboard) {
        this._growbe = g;
        this.lastMessageAt = new Date(this._growbe.lastUpdateAt).getTime();

        if (this.subEvent) { this.subEvent.unsubscribe(); }

        this.growbeEventService.getGrowbeEvent(g.id, '/cloud/state', (d) => JSON.parse(d))
            .pipe(untilComponentDestroyed(this))
            .subscribe((g) => {
                this._growbe = g;
                console.log('NOWE1');
                this.lastMessageAt = Date.now();
            });
    }
    get growbe() { return this._growbe; }
    _growbe: GrowbeMainboard;

    subEvent: Subscription;

    constructor(
        private growbeEventService: GrowbeEventService,
        private datePipe: DatePipe,
    ) {
        super();
    }

    ngOnInit(): void {
        this.lastMessageDiff$ = interval(1000).pipe(
            untilComponentDestroyed(this),
            map(() => {
                const diff = Date.now() - this.lastMessageAt;
                const date = new Date(0, 0, 0);
                date.setSeconds(diff / 1000);
                return this.datePipe.transform(date, 'mm:ss');
            })
        )
    }

}
