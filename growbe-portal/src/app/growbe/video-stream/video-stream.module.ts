import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamPlayerComponent } from './stream-player/stream-player.component';
import { StreamPickerComponent } from './stream-picker/stream-picker.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { ButtonsRowModule } from '@berlingoqc/ngx-common';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
    declarations: [StreamPlayerComponent, StreamPickerComponent],
    imports: [
        CommonModule,
        ButtonsRowModule,
        AutoTableModule,
        AutoFormModule,
        MatIconModule,
        MatButtonModule,
        ClipboardModule,
    ],
    exports: [StreamPlayerComponent, StreamPickerComponent],
})
export class VideoStreamModule {}
