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

    autoFormData: AutoFormData;

    constructor(private growbeGraphService: GrowbeGraphService) {}

    ngOnInit(): void {
        const parsed = localStorage.getItem('IKAM' + this.module.id);
        this.value = parsed ? JSON.parse(parsed) : null;

        const value = this.value
            ? {
                  ...this.value,
              }
            : null;
        const properties =  this.growbeGraphService.getGraphTimeFrameSelectForm(of(this.module.id));
        this.autoFormData = {
                        type: 'simple',
                        items: properties,
                        event: {
                            initialData: () => of(value),
                            submit: (value) => {
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
    }
}
