import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';

import flvjs from 'flv.js';

@Component({
    selector: 'app-stream-player',
    templateUrl: './stream-player.component.html',
    styleUrls: ['./stream-player.component.scss'],
})
export class StreamPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('element') element: ElementRef<HTMLMediaElement>;
    player: flvjs.Player;

    @Input() set stream(stream: any) {
        if (!stream) {
            return;
        }
        this.player = flvjs.createPlayer({
            type: 'flv',
            url: `${envConfig.nms}/live/${stream.streamName}.flv` + stream.url,
        });
        this.player.attachMediaElement(this.element.nativeElement);
        this.player.load();
        this.player.play();
    }

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit() {}

    ngOnDestroy(): void {
        this.player?.destroy();
    }
}
