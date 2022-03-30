import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReleaseNoteComponent } from "./release-note/release-note.component";
import { ReleasesComponent } from "./releases/releases.component";




@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: ReleasesComponent
    },
    {
      path: ':type/:version',
      component: ReleaseNoteComponent,
    },
    {
      path: 'current',
      component: ReleaseNoteComponent,
      data: {
        current: true,
      }
    }
  ])],
  exports: [RouterModule]
})
export class ReleasesRoutingModule {}
