import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import {
    GraphModuleRequest,
    GrowbeModuleWithRelations,
} from '@growbe2/ngx-cloud-api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeGraphService } from '../service/growbe-graph.service';

@Component({
    selector: 'app-module-graph-builder',
    templateUrl: './module-graph-builder.component.html',
    styleUrls: ['./module-graph-builder.component.scss'],
})
export class ModuleGraphBuilderComponent implements OnInit {
    @Input() module: GrowbeModuleWithRelations;

    @Input() value?: Partial<GraphModuleRequest>;

    @Output() onRequest = new EventEmitter<any>();

    autoFormData$: Observable<AutoFormData>;

    constructor(private growbeGraphService: GrowbeGraphService) {}

    ngOnInit(): void {
        const parsed = localStorage.getItem('IKAM' + this.module.id);
        this.value = parsed ? JSON.parse(parsed) : null;

        const value = this.value
            ? {
                  ...this.value,
                  fields: this.value.fields.reduce((pr, nx) => {
                      pr[nx] = true;
                      return pr;
                  }, {}),
              }
            : null;
        this.autoFormData$ = this.growbeGraphService
            .getGraphTimeFrameSelectForm(this.module.id)
            .pipe(
                map((properties) => {
                    return {
                        type: 'simple',
                        items: properties,
                        event: {
                            initialData: () => of(value),
                            submit: (value) => {
                                value.fields = Object.entries(value.fields)
                                    .filter(([k, v]) => v)
                                    .map(([k]) => k);
                                if (value.grouping) {
                                    if (
                                        value.grouping?.intervalUnit ===
                                            'minute' ||
                                        value.grouping?.intervalUnit === 'hour'
                                    ) {
                                        value.grouping.baseGroup = [
                                            'dayOfYear',
                                        ];
                                    }
                                }
                                localStorage.setItem(
                                    'IKAM' + this.module.id,
                                    JSON.stringify(value),
                                );
                                this.onRequest.next(value);
                                return of({});
                            },
                        },
                    } as AutoFormData;
                }),
            );
    }
}
