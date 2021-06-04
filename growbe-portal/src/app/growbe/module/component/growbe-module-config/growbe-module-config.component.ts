import { Component, Input, OnInit } from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';
import { getConfigForm } from '../../form';

@Component({
    selector: 'app-growbe-module-config',
    templateUrl: './growbe-module-config.component.html',
    styleUrls: ['./growbe-module-config.component.scss'],
})
export class GrowbeModuleConfigComponent implements OnInit {
    @Input() moduleId: string;
    @Input() moduleName: string;

    configForm$: Observable<AutoFormData>;

    constructor(
        private growbeModuleAPI: GrowbeModuleAPI,
        private growbeModuleDefAPI: GrowbeModuleDefAPI,
    ) {}

    ngOnInit(): void {
        this.configForm$ = combineLatest([
            this.growbeModuleAPI.get({
                where: {
                    uid: this.moduleId,
                },
            }),
            this.growbeModuleDefAPI.getById(this.moduleName),
        ]).pipe(
            map(([modules, moduleDef]) => {
                const config = modules[0].config;
                console.log('CONFIG', config);
                const type = modules[0].uid.slice(0, 3);
                const func = getConfigForm(type);
                return func
                    ? func(
                          modules[0].id,
                          config,
                          moduleDef,
                          this.growbeModuleAPI,
                      )
                    : undefined;
            }),
        );
    }
}
