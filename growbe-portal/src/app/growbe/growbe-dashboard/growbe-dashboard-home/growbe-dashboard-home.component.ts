import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@berlingoqc/fuse';

@Component({
  selector: 'app-growbe-dashboard-home',
  templateUrl: './growbe-dashboard-home.component.html',
  styleUrls: ['./growbe-dashboard-home.component.scss'],
  animations: fuseAnimations,
})
export class GrowbeDashboardHomeComponent implements OnInit {

  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.snapshot.data.dashboard;
  }

}
