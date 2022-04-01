import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesComponent } from './releases/releases.component';
import { ReleaseNoteComponent } from './release-note/release-note.component';
import { ReleasesRoutingModule } from './releases.routing';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    ReleasesComponent,
    ReleaseNoteComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule,
    ReleasesRoutingModule,
  ]
})
export class ReleasesModule { }
