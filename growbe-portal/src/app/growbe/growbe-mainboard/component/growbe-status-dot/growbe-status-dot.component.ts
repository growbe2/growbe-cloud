import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-growbe-status-dot',
    templateUrl: './growbe-status-dot.component.html',
    styleUrls: ['./growbe-status-dot.component.scss'],
    animations: [],
})
export class GrowbeStatusDotComponent implements OnInit {
    @Input() state: any;

    constructor() {}

    async ngOnInit() {}
}
