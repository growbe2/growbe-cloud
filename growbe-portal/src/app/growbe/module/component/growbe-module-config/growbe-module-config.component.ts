import { Component, Injector, Input, OnInit } from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import {OnDestroyMixin, untilComponentDestroyed} from '@berlingoqc/ngx-common';
import { GrowbeModule } from '@growbe2/ngx-cloud-api';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';
import { getConfigForm } from '../../form';

@Component({
    selector: 'app-growbe-module-config',
    templateUrl: './growbe-module-config.component.html',
    styleUrls: ['./growbe-module-config.component.scss'],
})
export class GrowbeModuleConfigComponent extends OnDestroyMixin(Object) implements OnInit {
    @Input() moduleId: string;

    configForm$: Observable<AutoFormData>;

    constructor(
        private growbeModuleAPI: GrowbeModuleAPI,
        private growbeActionAPI: GrowbeActionAPI,
        private injector: Injector,
    ) { super(); }

    ngOnInit(): void {
        this.configForm$ = combineLatest([
            this.growbeModuleAPI.getById(this.moduleId),
            this.growbeModuleAPI.moduleDef(this.moduleId).get(),
        ]).pipe(
            untilComponentDestroyed(this),
            map(([module, moduleDef]: [any, any]) => {
                const config = module.config;
                const type = module.id.slice(0, 3);
                const func = getConfigForm(type);
                return func
                    ? func(
                          module.mainboardId,
                          module.id,
                          config,
                          moduleDef,
                          this.growbeActionAPI,
                          this.injector,
                      )
                    : undefined;
            }),
        );
    }
}
