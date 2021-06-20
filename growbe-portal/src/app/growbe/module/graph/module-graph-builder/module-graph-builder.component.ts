import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GrowbeModuleWithRelations } from '@growbe2/ngx-cloud-api';

@Component({
  selector: 'app-module-graph-builder',
  templateUrl: './module-graph-builder.component.html',
  styleUrls: ['./module-graph-builder.component.scss']
})
export class ModuleGraphBuilderComponent implements OnInit {
  @Input() module: GrowbeModuleWithRelations

  @Output() onRequest = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  submit(timeframeData: any, propertiesData: any, groupingData: any) {
    if (!this.module) { return; }
    const request: any = {
      growbeId: this.module.mainboardId,
      moduleId: this.module.uid,
    };
    if (timeframeData.object?.timeSpan) {
      request['lastX'] = timeframeData.object.timeSpan;
      request['lastXUnit'] = timeframeData.object.unit;
      request['liveUpdate'] = timeframeData.update.live;
    } else {
      request['from'] = timeframeData.rangeDate.absoluteRange.start;
      request['to'] = timeframeData.rangeDate.absoluteRange.end;
    }
    request['fields'] = Object.entries(propertiesData.object).filter(([k,v]) => v).map(([k,v]) => k);
    if (groupingData.object.intervalValue) {
      request['grouping'] = {
        baseGroup: [],
        intervalValue: groupingData.object.intervalValue,
        intervalUnit: groupingData.object.intervalUnit.value,
      };
      if (request.grouping?.intervalUnit === 'minute' || request.grouping?.intervalUnit === 'hour') {
        request.grouping.baseGroup = ['dayOfYear'];
      }
    }
    this.onRequest.next(request);
  }
}
