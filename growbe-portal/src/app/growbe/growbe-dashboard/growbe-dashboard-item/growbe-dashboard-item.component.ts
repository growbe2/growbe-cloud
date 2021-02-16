import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@berlingoqc/fuse';

@Component({
  selector: 'app-growbe-dashboard-item',
  templateUrl: './growbe-dashboard-item.component.html',
  styleUrls: ['./growbe-dashboard-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class GrowbeDashboardItemComponent implements OnInit, OnDestroy {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

}
