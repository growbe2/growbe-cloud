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
import { take } from 'rxjs/operators';
import { GrowbeMainboard } from '@growbe2/ngx-cloud-api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-growbe-state',
    templateUrl: './growbe-state.component.html',
    styleUrls: ['./growbe-state.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GrowbeStateComponent implements OnInit, OnDestroy {
    @Input() mainboardId: GrowbeMainboard['id'];

    growbe: any;

    sub: Subscription;

    pulsingText = {
        pulsing: false,
    };

    constructor(
        private mainboardAPI: GrowbeMainboardAPI,
        private topic: GrowbeEventService,
    ) {}

    async ngOnInit() {
        if (!this.mainboardId) {
            return;
        }
        this.growbe = await this.mainboardAPI
            .getById(this.mainboardId)
            .pipe(take(1))
            .toPromise();
        this.sub = (
            await this.topic.getGrowbeEvent(this.mainboardId, '/heartbeath', (d) =>
                pb.HearthBeath.decode(d),
            )
        ).subscribe((beath) => {
            this.growbe.lastUpdateAt = beath;
            this.pulsingText.pulsing = true;
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
