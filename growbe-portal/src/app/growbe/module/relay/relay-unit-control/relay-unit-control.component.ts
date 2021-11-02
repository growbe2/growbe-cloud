import { Component, Input, OnInit } from '@angular/core';
import { GrowbeModule } from 'growbe-cloud-api/lib';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeGraphService } from '../../graph/service/growbe-graph.service';

@Component({
  selector: 'app-relay-unit-control',
  templateUrl: './relay-unit-control.component.html',
  styleUrls: ['./relay-unit-control.component.scss']
})
export class RelayUnitControlComponent implements OnInit {
  @Input() mainboardId: string;
  @Input() moduleId: string;
  @Input() field: string;


  fieldConfig: any;
  fieldData: any;
  fieldDataTimestamp: Date;

  constructor(
    private growbeModuleAPI: GrowbeModuleAPI,
    private graphService: GrowbeGraphService,
    private growbeActionAPI: GrowbeActionAPI,
  ) { }

  ngOnInit(): void {
    // faut que j'aille chercher la config et l'etat de cette propriétés
    combineLatest([
      this.growbeModuleAPI.getById(this.moduleId),
      this.growbeModuleAPI.moduleDef(this.moduleId).get(),
      this.graphService.getGraph(this.mainboardId, 'one', {
        growbeId: this.mainboardId,
        moduleId: this.moduleId,
        fields: [this.field],
      })
    ]).pipe(
      tap(([module, moduleDef, lastValue]: any) => {
        this.fieldConfig = module.config[this.field];
        this.fieldData = lastValue[0][this.field].state;
        this.fieldDataTimestamp = lastValue[0].endingAt;
      }),
    ).subscribe(() => {})
  }

}
