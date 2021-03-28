import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { AutoFormData, InputProperty } from '@berlingoqc/ngx-autoform';
import {notify} from '@berlingoqc/ngx-notification';
import { Observable, Subscription } from 'rxjs';
import { Filter } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs } from '@growbe2/ngx-cloud-api';
import { fuseAnimations } from '@berlingoqc/fuse';
@Component({
  selector: 'app-growbe-manager-detail',
  templateUrl: './growbe-manager-detail.component.html',
  styleUrls: ['./growbe-manager-detail.component.scss'],
  animations: [fuseAnimations],
})
export class GrowbeManagerDetailComponent implements OnInit {

  mainboard: Observable<any>;

  logFilter: Filter<GrowbeLogs> = {
    order: ['timestamp desc'],
    limit: 20,
    offset: 0,
  }

  id: string;

  detailMainboardForm: AutoFormData = {
    type: 'simple',
    items: [
      {
        type: 'object',
        name: 'mainboard',
        properties: [
          {
            name: 'id',
            type: 'string',
            displayName: "ID",
            disabled: true,

          },
          {
            name: 'version',
            type: 'string',
            displayName: "Version du mainboard",
            disabled: true,
            hint: 'Version du mainboard'
          } as InputProperty,
          {
            name: 'cloudVersion',
            type: 'string',
            displayName: "Version protobuf",
            disabled: true,
            hint: 'Version du cloud dans le mainboard'
          } as InputProperty,
          {
            name: 'name',
            type: 'string',
            displayName: "Nom",
            required: false,
          },
        ]
      }
    ],
    onSubmitValid: (d) => {
      console.log(d);
      this.mainboardAPI.updateById(this.id, d.mainboard)
        .pipe(notify({title: 'Mainboard modifié',body: () => `${this.id}`}))
        .toPromise().then(() => {
        });
    }
  };

  moduleColumns: TableColumn[] = [
    {
      id: 'id',
      title: 'ID',
      content: (g) => g.id,
    },
    {
      id: 'name',
      title: 'UID',
      content: (g) => g.uid
    },
  ];

  warningColumns: TableColumn[] = [
    {
      id: 'type',
      title: 'Type',
      content: (w) => w.warningKeyId
    }
  ]


  sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public mainboardAPI: GrowbeMainboardAPI,
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.data.mainboard.id;

    this.mainboard = this.mainboardAPI.getById(this.id);
  }

}
