import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GrowbeModuleWithRelations} from '@growbe2/ngx-cloud-api';

@Component({
  selector: 'app-growbe-module-detail',
  templateUrl: './growbe-module-detail.component.html',
  styleUrls: ['./growbe-module-detail.component.scss']
})
export class GrowbeModuleDetailComponent implements OnInit {


  module: GrowbeModuleWithRelations;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.module = this.activatedRoute.snapshot.data.module;
  }

}
