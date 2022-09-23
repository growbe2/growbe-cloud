import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    envConfig,
    OnDestroyMixin,
    untilComponentDestroyed,
} from '@berlingoqc/ngx-common';

import flvjs from 'flv.js';
import { filter, map } from 'rxjs/operators';
import { GrowbeStreamAPI } from '../../api/growbe-stream';

@Component({
    selector: 'app-video-player',
    template: `<video style="width: 100%; height: 100%" #element controls [muted]="mute"></video>`,
    styles: [],
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
    @ViewChild('element') element: ElementRef<HTMLMediaElement>;
    @Input() mute = false;
    @Input() set url(url: string) {
        this.mUrl = url;

        if (this.element) {
            this.start();
        }
    }
    get url() {
        return this.mUrl;
    }

    private mUrl: string;
    private player: flvjs.Player;

    ngAfterViewInit() {
        if (this.url) {
            this.start();
        }
    }

    ngOnDestroy(): void {
        this.player?.destroy();
    }

    private start() {
        this.player?.destroy();
        this.player = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: this.url,
        });
        this.player.attachMediaElement(this.element.nativeElement);
        this.player.load();
        this.player.play();
    }
}

@Component({
    selector: 'app-stream-player',
    templateUrl: './stream-player.component.html',
    styleUrls: ['./stream-player.component.scss'],
})
export class StreamPlayerComponent
    extends OnDestroyMixin(Object)
    implements OnInit {
    @Input() streamDefaultIndex: number = 0;

    @Input() mainboardId: string;
    @Input() streamNames: string[];

    @Input() showMultiple: boolean = false;
    @Input() mute: boolean = false;

    currentIndex: number = 0;
    streams: any[];
    streamsURL: string[];

    constructor(public growbeStreamAPI: GrowbeStreamAPI) {
        super();
    }

    ngOnInit(): void {
        this.currentIndex = this.streamDefaultIndex;
        this.growbeStreamAPI
            .getLiveStreams(this.mainboardId)
            .pipe(untilComponentDestroyed(this))
            .subscribe((data) => {
                data = data.filter((x) =>
                    this.streamNames.includes(x.streamName),
                );
                if (data) {
                    this.streams = data;
                    this.streamsURL = data.map(
                        (d) =>
                            `${envConfig.nms}/live/${d.streamName}.flv` + d.url,
                    );
                }
            });
    }
}
