import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamPlayerComponent, VideoPlayerComponent } from './stream-player/stream-player.component';
import { StreamPickerComponent } from './stream-picker/stream-picker.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { ButtonsRowModule } from '@berlingoqc/ngx-common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { VideoStreamPageComponent } from './video-stream-page/video-stream-page.component';
import { DashboardModule } from '@growbe2/growbe-dashboard';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [VideoPlayerComponent, StreamPlayerComponent, StreamPickerComponent, VideoStreamPageComponent],
    imports: [
        CommonModule,
        DashboardModule,
        ButtonsRowModule,
        AutoTableModule,
        AutoFormModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatToolbarModule,
        ClipboardModule,
    ],
    exports: [StreamPlayerComponent, StreamPickerComponent, VideoStreamPageComponent],
})
export class VideoStreamModule {}
