import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@berlingoqc/auth';
import { FAQRoutes } from '@berlingoqc/fuse-extra';
import { LoginComponent } from './auth/login/login.component';
import { MqttConnectGuard } from './growbe/guard/mqtt-connect.guard';
import { HomeComponent } from './home/home.component';
import { NodeEditorComponent } from './node-editor/node-editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'growbe',
    loadChildren: () =>
      import('./growbe/growbe-manager/growbe-manager.module').then(
        (m) => m.GrowbeManagerModule
      ),
    canLoad: [MqttConnectGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./growbe/growbe-dashboard/growbe-dashboard.module').then(
        (m) => m.GrowbeDashboardModule
      ),
    canLoad: [MqttConnectGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./wrapper/user-managing').then((m) => m.UserManagingModule),
  },
  {
    path: 'editor',
    component: NodeEditorComponent,
    canActivate: [AuthGuard],
  },
  ...FAQRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
