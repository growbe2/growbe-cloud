import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {
    @Input() unit: string;

    constructor() {}

    ngOnInit(): void {}
}
