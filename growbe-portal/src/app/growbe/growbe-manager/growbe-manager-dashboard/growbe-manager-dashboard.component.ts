import { Component, OnInit } from '@angular/core';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';

@Component({
    selector: 'app-growbe-manager-dashboard',
    templateUrl: './growbe-manager-dashboard.component.html',
    styleUrls: ['./growbe-manager-dashboard.component.scss'],
})
export class GrowbeManagerDashboardComponent implements OnInit {
    constructor(public growbeMainboardAPI: GrowbeMainboardAPI) {}

    ngOnInit(): void {}
}
