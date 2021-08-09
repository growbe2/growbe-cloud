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

    private mStream: any;
    @Input() set stream(stream: any) {
        if (!stream) {
            return;
        }
        this.mStream = stream;
        this.startPlayer();
    }

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit() {
      if (this.mStream) {
        this.startPlayer();
      }
    }

    ngOnDestroy(): void {
        this.player?.destroy();
    }

    private startPlayer() {
      if (this.element) {
          this.player = flvjs.createPlayer({
            type: 'flv',
            url: `${envConfig.nms}/live/${this.mStream.streamName}.flv` + this.mStream.url,
          });
          this.player.attachMediaElement(this.element.nativeElement);
          this.player.load();
          this.player.play();
        }
    }
}
