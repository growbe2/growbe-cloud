import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountModule, AuthModule } from '@berlingoqc/auth';

import { PageLayoutModule } from '@berlingoqc/fuse-extra';
import { Login2Module } from '@berlingoqc/fuse-extra';
import { RouterModule } from '@angular/router';
import { FuseSharedModule, FuseWidgetModule } from '@berlingoqc/fuse';
import { AuthComponent } from 'src/app/auth/auth.component';

@NgModule({
    declarations: [LoginComponent, AuthComponent],
    imports: [
        CommonModule,
        AccountModule,
        RouterModule,
        PageLayoutModule,
        FuseWidgetModule,
        Login2Module,
    ],
})
export class GrowbeAuthModule {}
