import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations, FuseSidebarService } from '@berlingoqc/fuse';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { Include, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeWarningAPI } from '../../api/growbe-warning';

@Component({
  selector: 'app-growbe-dynamic-dashboard',
  templateUrl: './growbe-dynamic-dashboard.component.html',
  styleUrls: ['./growbe-dynamic-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class GrowbeDynamicDashboardComponent implements OnInit {


  data: any;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.snapshot.data.dashboard;
    console.log(this.data);
  }


  toggleSidebar(name): void
  {
      const sidebar = this._fuseSidebarService.getSidebar(name);
      sidebar.toggleOpen();
  }

}
