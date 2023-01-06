import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ChangeDetectorRef, Injectable, Injector, NgModule } from '@angular/core';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {
    EnvConfigurationService,
    APP_ENV_PROVIDER,
    envConfig,
    PathIDResolver,
    IDResolver,
    DynamicModuleModule,
    DynamicModuleService,
} from '@berlingoqc/ngx-common';

import { navigation } from './fuse/navigation/navigation';
import { PWAModule, PWA_CONFIG } from '@berlingoqc/ngx-pwa';
import { NotificationModule, NotificationService } from '@berlingoqc/ngx-notification';
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
    NavigateService,
    AUTH_APP_INITALIZER,
    EmailModule,
    OrganisationModule,
    Actions,
} from '@berlingoqc/auth';
import { HomeComponent } from './home/home.component';

import { GrowbeAuthModule } from './auth/auth.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './home/navigation.component';
import { GrowbeDashboardAPI } from './growbe/api/growbe-dashboard';

import * as Dashboard from '@growbe2/growbe-dashboard';
import {
    DashboardModule,
    DashboardRegistryService,
} from '@growbe2/growbe-dashboard';
import { TranslateModule } from '@ngx-translate/core';
import { HelpersModule } from './helpers/helpers.module';
import { delayWhen, filter, switchMap, tap, timeout } from 'rxjs/operators';
import { UserPreferenceService } from './service/user-preference.service';
import { GrowbeDashboardRegistry } from './growbe/growbe-dashboard/items';
import { GrowbeMainboardAPI } from './growbe/api/growbe-mainboard';
import { Subscription, timer } from 'rxjs';
import { GrowbeMainboard } from '@growbe2/ngx-cloud-api';
import { GrowbeEventService } from './growbe/services/growbe-event.service';
import { MarkdownModule } from 'ngx-markdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    declarations: [HomeComponent, NavigationComponent,],
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
        TranslateModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        FlexLayoutModule,
        AccountModule,
        AuthModule.forRoot(),
        NotificationModule.forRoot({} as any),
        MarkdownModule.forRoot(),

        NgxChartsModule,

        DynamicModuleModule,

        HelpersModule,

        EmailModule,
        AccountModule,
        OrganisationModule,

        GrowbeAuthModule,

        DashboardModule.forRoot(GrowbeDashboardAPI),
    ],
    providers: [
        EnvConfigurationService,
        APP_ENV_PROVIDER,
        AUTH_APP_INITALIZER({
            component: AuthDialogComponent,
            navigate: NavigationWrapper,
            config: {
                img: '/assets/icons/android/android-launchericon-96-96.png',
                mainContainerClass: 'auth-dialog',
                itemClass: {},
                noProfileImg: '/assets/icons/android-chrome-96x96.png',
            },
        }),
        {
          provide: NavigateService,
          useClass: NavigationWrapper,
        },
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
        {
          provide: Actions,
          useValue: {
                validate: '/account/validate/invitation',
                confirm: '/account/validate/account',
		      },
        },
        {
          provide: DashboardRegistryService,
          useClass: GrowbeDashboardRegistry,
        }
        /*{
          provide: DashboardService,
          useClass: GrowbeDashboardAPI,
        },*/
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(
        authService: AuthService,
        layourService: LayoutEventService,
        navigationService: FuseNavigationService,
        injector: Injector,
        moduleService: DynamicModuleService,
        service: DashboardRegistryService,
        route: Router,
        notificationService: NotificationService,
        growbeEventService: GrowbeEventService,
        userPreference: UserPreferenceService,
        growbeAPI: GrowbeMainboardAPI,
        fuseNavService: FuseNavigationService,
    ) {

      let subs: Subscription[] = [];
      const clearSubs = () => subs.forEach((s) => s.unsubscribe());

      layourService.logoutSubject.subscribe(() => authService.logout());

      growbeAPI.loadCloudFeature();

      authService.loginEvents.asObservable().pipe(
          filter((event) => event === 'disconnected'),
      ).subscribe(() => clearSubs());

      authService.loginEvents.asObservable().pipe(
        filter((event) => event === 'connected'),
        switchMap(() => userPreference.get()),
        switchMap(() => growbeAPI.userGrowbeMainboard(authService.profile.id).get({include: [{relation: "growbeMainboardConfig"}]}))
      ).subscribe((growbes) => {
          if (route.url === '/auth') {
              route.navigate(['/home']);
          }
          clearSubs();
          const navItemGrowbe = fuseNavService.getNavigationItem("growbe");
          navItemGrowbe.type = "group";
          navItemGrowbe.url = null;
          navItemGrowbe.children = growbes.map((growbe) => {
              // should be clean up on disconnect or on recall
            growbeAPI.requestFind.defaultValueObs(growbe.id, growbe);
            subs[subs.length] = growbeAPI.getById(growbe.id, { include: [{relation: 'growbeMainboardConfig'}]}).subscribe((g: GrowbeMainboard) => {
                const navItemGrowbe = fuseNavService.getNavigationItem("growbe");
                const indexItem = (navItemGrowbe.children as any[]).findIndex((x) => x.id == g.id);
                navItemGrowbe.children[indexItem].title = g.name ? g.name : g.id;
                navItemGrowbe.children[indexItem].icon = (g.state === 'CONNECTED') ? 'link': 'link_off';
                fuseNavService.updateNavigationItem("growbe", navItemGrowbe);

                let previous_state = undefined;

                setTimeout(() => {
                    subs[subs.length] = growbeEventService.getGrowbeEvent(g.id, '/cloud/state', (d) => JSON.parse(d)).subscribe((g) => {
                        const navItemGrowbe = fuseNavService.getNavigationItem("growbe");
                        const indexItem = (navItemGrowbe.children as any[]).findIndex((x) => x.id == g.id);
                        navItemGrowbe.children[indexItem].icon = g.state === 'CONNECTED' ? 'link' : 'link_off';
                        fuseNavService.updateNavigationItem("growbe", navItemGrowbe);
                        // Will put it back when event whill not triger all the time
                        if (previous_state && previous_state !== g.state) {
                            notificationService.openNotification({
                                title: (d) => 'Mainboard state change',
                                body: `Board ${g.name ? g.name: g.id} is ${g.state.toLowerCase()}`,
                            });
                        }
                        previous_state = g.state;
                    });
                }, 1000);
            });


            return {
                id: growbe.id,
                title: growbe.name ? growbe.name : growbe.id,
                type: 'item',
                //icon: growbe.state === 'CONNECTED' ? 'link': 'linkoff',
                url: '/growbe/' + growbe.id
            }
          });
          navItemGrowbe.children.push({
              id: 'add_growbe',
              type: 'item',
              icon: 'add',
              title: 'Register a new growbe',
              url: '/register'
          });
          fuseNavService.updateNavigationItem("growbe", navItemGrowbe);
      })
        /*moduleService.loadModuleSystemJS(
            {
                path: '/assets/umd.js',
                location: '/assets/greenhouse.umd.js',
                moduleName: '/assets/umd.js',
                description: '123',
                modules: {
                    '@growbe2/growbe-dashboard': Dashboard,
                },
            },
            injector,
        );
        console.log('SERVICE', service);*/
    }
}
