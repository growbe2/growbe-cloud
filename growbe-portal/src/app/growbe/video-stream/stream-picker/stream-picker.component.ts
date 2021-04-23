import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GrowbeStreamAPI } from 'src/app/growbe/api/growbe-stream';

@Component({
    selector: 'app-stream-picker',
    templateUrl: './stream-picker.component.html',
    styleUrls: ['./stream-picker.component.scss'],
})
export class StreamPickerComponent implements OnInit {
    @Output() streamSelected = new EventEmitter<any>();
    @Input() growbeId: string;

    streams: Observable<any[]>;

    constructor(private growbeStreamAPI: GrowbeStreamAPI) {}

    ngOnInit(): void {
        this.streams = this.growbeStreamAPI.get({
            where: {
                growbeMainboardId: this.growbeId,
            },
        });
    }
}
