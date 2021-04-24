import { Component, Input, OnInit } from '@angular/core';
import { GrowbeModuleDefWithRelations } from '@growbe2/ngx-cloud-api';
import {Observable} from 'rxjs';
import {GrowbeModuleDefAPI} from 'src/app/growbe/api/growbe-module-def';

@Component({
  selector: 'app-growbe-module-def',
  templateUrl: './growbe-module-def.component.html',
  styleUrls: ['./growbe-module-def.component.scss']
})
export class GrowbeModuleDefComponent implements OnInit {

  @Input() moduleDefId: string;

  moduleDef: Observable<GrowbeModuleDefWithRelations>;

  def: GrowbeModuleDefWithRelations;

  constructor(
    private moduleDefAPI: GrowbeModuleDefAPI,
  ) { }

  ngOnInit(): void {
    if (!this.moduleDefId) return;
    this.moduleDef = this.moduleDefAPI.getById(this.moduleDefId);
  }

}
