import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, FaqModule, LayoutEventService, LayoutModule, SITE_LOGO, SITE_NAME, TOOLBAR_NAVIGATION } from '@berlingoqc/fuse-extra';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {
  EnvConfigurationService,
  APP_ENV_PROVIDER,
  envConfig,
} from '@berlingoqc/ngx-common';

import { navigationLogin, navigation } from './fuse/navigation/navigation';
import { NotificationModule, PWAModule } from '@berlingoqc/ngx-pwa';
import { FuseModule, FuseNavigationService } from '@berlingoqc/fuse';
import { fuseConfig } from './fuse/fuse-config';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FAQS } from './fuse/faq';
import { Router } from '@angular/router';
import {AuthModule, AuthDialogComponent, AccountModule, AuthService} from '@berlingoqc/auth';
import { HomeComponent } from './home/home.component'

import {debounceTime, distinct, distinctUntilChanged, filter} from 'rxjs/operators'
import { FlexLayoutModule } from '@angular/flex-layout';
@Injectable({
  providedIn: 'root',
})
export class NavigationWrapper {
  constructor(private router: Router) {}

  navigate(d) {
    this.router.navigate(d);
  }
}
@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    PWAModule,
    FuseModule.forRoot(fuseConfig),
    LayoutModule,
    FaqModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FlexLayoutModule,
    AccountModule,
    AuthModule.forRoot({
      component: AuthDialogComponent,
      backend: {
        url: 'http://localhost:3001/api/',
      },
      navigate: NavigationWrapper,
      actions: {
        validate: '/full/account/validate/invitation',
        confirm: '/full/account/validate/account',
      },
      config: {
        img: 'assets/icon-72x72.png',
        mainContainerClass: 'auth-dialog',
        itemClass: {
          FIRST_BTN: [],
          SECOND_BTN: [],
        },
        noProfileImg: '/assets/images/profil.png',
      },
    }),
  ],
  providers: [
    EnvConfigurationService,
    APP_ENV_PROVIDER,
    {
      provide: TOOLBAR_NAVIGATION,
      useValue: navigation,
    },
    {
      provide: SITE_NAME,
      useValue: 'Portail Growbe',
    },
    {
      provide: SITE_LOGO,
      useValue: ''
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: 'FAQResolver',
      useValue: () => FAQS,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(authService: AuthService, layourService: LayoutEventService, navigationService: FuseNavigationService) {
    layourService.logoutSubject.asObservable().subscribe(() => {
      authService.logout();
      navigationLogin.forEach((e) => navigationService.removeNavigationItem(e.id))
    });
    authService.loginEvents.asObservable().pipe(filter(x => x === 'connected'), debounceTime(100))
      .subscribe(() => navigationLogin.forEach((e) => { console.log('DAS'); navigationService.addNavigationItem(e, 'end') }));
  }
}
