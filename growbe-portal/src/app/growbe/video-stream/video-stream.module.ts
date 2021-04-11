import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamPlayerComponent } from './stream-player/stream-player.component';
import { StreamPickerComponent } from './stream-picker/stream-picker.component';



@NgModule({
  declarations: [StreamPlayerComponent, StreamPickerComponent],
  imports: [
    CommonModule
  ],
  exports: [StreamPlayerComponent, StreamPickerComponent],
})
export class VideoStreamModule { }
