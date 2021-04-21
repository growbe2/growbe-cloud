import { Component, Input, OnInit } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

@Component({
  selector: 'app-module-status-dot',
  templateUrl: './module-status-dot.component.html',
  styleUrls: ['./module-status-dot.component.scss']
})
export class ModuleStatusDotComponent implements OnInit {

  @Input() module: any;

  status;

  constructor(private growbeEventService: GrowbeEventService) { }

  ngOnInit(): void {
    if (this.module) {
      this.status = this.growbeEventService.getGrowbeEvent(this.module.mainboardId, `/cloud/m/${this.module.uid}/state`, JSON.parse).pipe(startWith(this.module));
    }
  }

}
