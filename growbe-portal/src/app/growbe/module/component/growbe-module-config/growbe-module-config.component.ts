import { Component, Input, OnInit } from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { getConfigForm } from '../../form';

@Component({
    selector: 'app-growbe-module-config',
    templateUrl: './growbe-module-config.component.html',
    styleUrls: ['./growbe-module-config.component.scss'],
})
export class GrowbeModuleConfigComponent implements OnInit {
    @Input() moduleId: string;

    configForm$: Observable<AutoFormData>;

    constructor(private growbeModuleAPI: GrowbeModuleAPI) {}

    ngOnInit(): void {
        this.configForm$ = this.growbeModuleAPI
            .get({
                where: {
                    uid: this.moduleId,
                },
                include: [
                    {
                        relation: 'moduleDef',
                    },
                ],
            })
            .pipe(
                map((modules) => {
                    const config = modules[0].config;
                    console.log(config);
                    const type = modules[0].uid.slice(0, 3);
                    const func = getConfigForm(type);
                    return func
                        ? func(
                              modules[0].id,
                              config,
                              modules[0].moduleDef,
                              this.growbeModuleAPI,
                          )
                        : undefined;
                }),
            );
    }
}
