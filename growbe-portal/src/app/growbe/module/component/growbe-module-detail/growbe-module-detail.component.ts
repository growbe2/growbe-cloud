import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GrowbeModuleDefWithRelations, GrowbeModuleWithRelations} from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';

@Component({
  selector: 'app-growbe-module-detail',
  templateUrl: './growbe-module-detail.component.html',
  styleUrls: ['./growbe-module-detail.component.scss']
})
export class GrowbeModuleDetailComponent implements OnInit {


  module: GrowbeModuleWithRelations;

  moduleDef$: Observable<GrowbeModuleDefWithRelations>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moduleDefAPI: GrowbeModuleDefAPI,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.data.module) {
      this.module = this.activatedRoute.snapshot.data.module;
      this.moduleDef$ = this.moduleDefAPI.getById(this.module.moduleName);
    }
  }

}
