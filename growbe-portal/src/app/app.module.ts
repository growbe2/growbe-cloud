import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {
  AppComponent,
  FaqModule,
  LayoutEventService,
  LayoutModule,
  SITE_LOGO,
  SITE_NAME,
  TOOLBAR_NAVIGATION,
} from '@berlingoqc/fuse-extra';
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
import {
  AuthModule,
  AuthDialogComponent,
  AccountModule,
  AuthService,
  AuthSettingConfig,
  AUTH_APP_INITALIZER,
} from '@berlingoqc/auth';
import { HomeComponent } from './home/home.component';

import {
  debounceTime,
  distinct,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NodeEditorComponent } from './node-editor/node-editor.component';


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
  declarations: [HomeComponent, NodeEditorComponent],
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
    AuthModule.forRoot(),
  ],
  providers: [
    EnvConfigurationService,
    APP_ENV_PROVIDER,
    AUTH_APP_INITALIZER({
      component: AuthDialogComponent,
      navigate: NavigationWrapper,
      actions: {
        validate: '/full/account/validate/invitation',
        confirm: '/full/account/validate/account',
      },
      config: {
        img: 'assets/icons/android-chrome-96x96.png',
        mainContainerClass: 'auth-dialog',
        itemClass: {
          FIRST_BTN: ['btn', 'button', 'btn-lg', 'thm-btn'],
          SECOND_BTN: ['btn', 'button', 'btn-lg', 'thm-btn', 'thm-btn-2'],
        },
        noProfileImg: '/assets/icons/android-chrome-96x96.pngg',
      },
    }),
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
      useValue: '/assets/icons/android-chrome-96x96.png',
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
  constructor(
    authService: AuthService,
    layourService: LayoutEventService,
    navigationService: FuseNavigationService
  ) {
    layourService.logoutSubject.asObservable().subscribe(() => {
      authService.logout();
      navigationLogin.forEach((e) =>
        navigationService.removeNavigationItem(e.id)
      );
    });
    authService.loginEvents
      .asObservable()
      .pipe(
        filter((x) => x === 'connected'),
        debounceTime(100)
      )
      .subscribe(() =>
        navigationLogin.forEach((e) => {
          navigationService.addNavigationItem(e, 'end');
        })
      );
  }
}
