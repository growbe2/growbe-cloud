import { Component, Input, OnInit } from '@angular/core';
import { CRUDDataSource } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  @Input()
  growbeId: string;

  @Input()
  logsSource: CRUDDataSource<GrowbeLogs>;

  logs: Observable<string[]>;

  constructor(
    private eventService: GrowbeEventService,
  ) { }

  ngOnInit(): void {
    this.logs = this.eventService.getGrowbeEventWithSource(
      this.growbeId,
      '/cloud/logs',
      (d) => JSON.parse(d),
      this.logsSource.get()).pipe(map((logs) => {
      return logs.map(log => `[${log.timestamp}][${log.group}][${log.type}] ${log.growbeModuleId} ${log.message}`);
    }));
  }

}
