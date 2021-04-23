import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@berlingoqc/fuse';

import { BaseDashboardElement } from '@growbe2/ngx-cloud-api';

@Component({
    selector: 'app-growbe-dashboard-item',
    templateUrl: './growbe-dashboard-item.component.html',
    styleUrls: ['./growbe-dashboard-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GrowbeDashboardItemComponent implements OnInit, OnDestroy {
    @Input() item: BaseDashboardElement;

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy() {}
}
