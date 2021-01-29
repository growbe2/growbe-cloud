import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FAQRoutes } from '@berlingoqc/fuse-extra';
import { HomeComponent } from './home/home.component';
import { NodeEditorComponent } from './node-editor/node-editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full'
  },
  {
    path: 'acceuil',
    component: HomeComponent,
  },
  {
    path: 'editor',
    component: NodeEditorComponent,
  },
  ...FAQRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
