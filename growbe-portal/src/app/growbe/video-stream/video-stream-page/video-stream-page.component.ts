import { Component, Input, OnInit } from '@angular/core';
import { DashboardItem } from '@growbe2/growbe-dashboard';

@Component({
  selector: 'app-video-stream-page',
  templateUrl: './video-stream-page.component.html',
  styleUrls: ['./video-stream-page.component.scss']
})
export class VideoStreamPageComponent implements OnInit {
  @Input() growbeId: string;


  streamDashboardItem: DashboardItem;

  constructor() { }

  ngOnInit(): void {
  }

  onStreamSelected(stream: any) {
    this.streamDashboardItem = {
      component: 'video-stream',
      copy: true,
      name: '',
      outputs: {

      },
      inputs: {
        mainboardId: this.growbeId,
        streamId: stream.id,
        mute: false,
      },
      extraMenus: {
        'close': {
          name: 'Fermer',
          callback: () => (this.streamDashboardItem = null),
        }
      }
    }

  }

}
