import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { envConfig, OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';

import flvjs from 'flv.js';
import { filter, map } from 'rxjs/operators';
import { GrowbeStreamAPI } from '../../api/growbe-stream';

@Component({
    selector: 'app-stream-player',
    templateUrl: './stream-player.component.html',
    styleUrls: ['./stream-player.component.scss'],
})
export class StreamPlayerComponent extends OnDestroyMixin(Object) implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('element') element: ElementRef<HTMLMediaElement>;
    player: flvjs.Player;

    private mStream: any;

    @Input() mainboardId: string;
    @Input() streamId: string;

    @Input() mute: boolean;

    constructor(
        public growbeStreamAPI: GrowbeStreamAPI,
    ) {
      super();
    }

    ngOnInit(): void {
      this.growbeStreamAPI.getLiveStreams(this.mainboardId).pipe(
        untilComponentDestroyed(this),
        map((item) => item.find(x => x.id === this.streamId)),
      ).subscribe((data) => {
        if (data) {
          this.mStream = data;
          this.startPlayer();
        }
      })
    }

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
