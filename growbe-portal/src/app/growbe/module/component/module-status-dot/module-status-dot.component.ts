import { Component, Input, OnInit } from '@angular/core';
import { OnDestroyMixin } from '@berlingoqc/ngx-common';
import { GrowbeModule } from 'growbe-cloud-api/lib';

@Component({
  selector: 'app-module-status-dot',
  templateUrl: './module-status-dot.component.html',
  styleUrls: ['./module-status-dot.component.scss'],
})
export class ModuleStatusDotComponent extends OnDestroyMixin(Object) implements OnInit {

  @Input() module: GrowbeModule;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
