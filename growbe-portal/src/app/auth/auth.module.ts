import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AccountModule, AuthModule} from '@berlingoqc/auth';


import {PageLayoutModule} from '@berlingoqc/fuse-extra';
import {Login2Module} from '@berlingoqc/fuse-extra';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AccountModule,
    RouterModule,
    PageLayoutModule,
    Login2Module,
  ]
})
export class GrowbeAuthModule { }
