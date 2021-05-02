import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamPlayerComponent } from './stream-player/stream-player.component';
import { NewEditFormDirective, StreamPickerComponent } from './stream-picker/stream-picker.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';


@NgModule({
    declarations: [
        StreamPlayerComponent,
        StreamPickerComponent,
        NewEditFormDirective,
    ],
    imports: [
        CommonModule,
        AutoTableModule,
        AutoFormModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        StreamPlayerComponent,
        StreamPickerComponent,
    ],
})
export class VideoStreamModule {}
