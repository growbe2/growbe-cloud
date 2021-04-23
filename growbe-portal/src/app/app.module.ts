import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {
    AppComponent,
    FaqModule,
    LayoutEventService,
    LayoutModule,
    SITE_LOGO,
    SITE_NAME,
    TOOLBAR_NAVIGATION,
    FUSE_FULL_SCREEN_BACKGROUND_PATH,
} from '@berlingoqc/fuse-extra';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {
    EnvConfigurationService,
    APP_ENV_PROVIDER,
    envConfig,
    PathIDResolver,
    IDResolver,
} from '@berlingoqc/ngx-common';

import { navigation } from './fuse/navigation/navigation';
import { PWAModule, PWA_CONFIG } from '@berlingoqc/ngx-pwa';
import { NotificationModule } from '@berlingoqc/ngx-notification';
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
    EmailModule,
    OrganisationModule,
} from '@berlingoqc/auth';
import { HomeComponent } from './home/home.component';

import { GrowbeAuthModule } from './auth/auth.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './home/navigation.component';
@Injectable({
    providedIn: 'root',
})
export class NavigationWrapper {
    constructor(private router: Router) {}

    navigate(d): void {
        this.router.navigate(d);
    }
}
@NgModule({
    declarations: [HomeComponent, NavigationComponent],
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
        NotificationModule.forRoot({} as any),

        EmailModule,
        AccountModule,
        OrganisationModule,

        GrowbeAuthModule,
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
                img: '/assets/icons/android/android-launchericon-192-192.png',
                mainContainerClass: 'auth-dialog',
                itemClass: {},
                noProfileImg: '/assets/icons/android-chrome-96x96.png',
            },
        }),
        {
            provide: TOOLBAR_NAVIGATION,
            useValue: navigation,
        },
        {
            provide: SITE_NAME,
            useValue: 'Portail Growbe ',
        },
        {
            provide: SITE_LOGO,
            useValue: '/assets/icons/android/android-launchericon-72-72.png',
        },
        {
            provide: IDResolver,
            useClass: PathIDResolver,
        },
        {
            provide: FUSE_FULL_SCREEN_BACKGROUND_PATH,
            useValue: '/assets/backimage.jpg',
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
        {
            provide: PWA_CONFIG,
            useValue: { autoUpdate: false },
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
        navigationService: FuseNavigationService,
    ) {}
}
