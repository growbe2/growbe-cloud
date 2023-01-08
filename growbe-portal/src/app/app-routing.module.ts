import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@berlingoqc/auth';
import { AuthComponent } from 'src/app/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { MqttConnectGuard } from './growbe/guard/mqtt-connect.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
     {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: 'auth',
            component: LoginComponent,
          },
          {
            path: 'account',
            loadChildren: () => import('./wrapper/account').then((m) => m.AuthWrapperModule)
          }
        ]

      },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, MqttConnectGuard],
    },
    {
        path: 'growbe',
        loadChildren: () =>
            import('./growbe/growbe-manager/growbe-manager.module').then(
                (m) => m.GrowbeManagerModule,
            ),
        canLoad: [MqttConnectGuard],
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./growbe/growbe-dashboard/growbe-dashboard.module').then(
                (m) => m.GrowbeDashboardModule,
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
        path: 'orgs',
       loadChildren: () => import('./wrapper/organisation').then(m => m.OrganisationWrapperModule),
    },
    {
        path: 'me',
        loadChildren: () => import('./wrapper/user-account').then(m => m.UserAccountWrapperModule),
    },
    {
        path: 'register',
        loadChildren: () => import('./growbe/growbe-manager/growbe-register/growbe-register.module').then(m => m.GrowbeRegisterModule),
    },
    {
        path: 'calibrate',
        loadChildren: () => import('./growbe/module/calibration/calibration-process/calibration-process.module').then(m => m.CalibrationProcessModule),
        canLoad: [MqttConnectGuard],
        canActivate: [AuthGuard],
    },
    {
        path: 'releases',
        loadChildren: () => import('./releases/releases.module').then(m => m.ReleasesModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
