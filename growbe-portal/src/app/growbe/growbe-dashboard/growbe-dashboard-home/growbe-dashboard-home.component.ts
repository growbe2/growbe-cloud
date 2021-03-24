import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@berlingoqc/fuse';
import { GrowbeDashboardWithRelations } from '@growbe2/ngx-cloud-api';

@Component({
  selector: 'app-growbe-dashboard-home',
  templateUrl: './growbe-dashboard-home.component.html',
  styleUrls: ['./growbe-dashboard-home.component.scss'],
  animations: fuseAnimations,
})
export class GrowbeDashboardHomeComponent implements OnInit {

  data: GrowbeDashboardWithRelations;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.snapshot.data.dashboard;
  }

}
