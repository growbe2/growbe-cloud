import { Directive, Input, OnInit } from "@angular/core";
import { unsubscriber } from "@berlingoqc/ngx-common";
import { GrowbeModule, GrowbeModuleDef } from "@growbe2/ngx-cloud-api";
import { Subscription, merge } from "rxjs";
import { map } from "rxjs/operators";
import { GrowbeModuleAPI } from "../../api/growbe-module";
import { GrowbeEventService } from "../../services/growbe-event.service";
import { GrowbeGraphService } from "../graph/service/growbe-graph.service";


@Directive({})
@unsubscriber
export class BaseSVGModuleComponent implements OnInit {

  @Input() module: GrowbeModule;
  @Input() moduleDef: GrowbeModuleDef;

  data: any;

  sub: Subscription;

  constructor(
    private topic: GrowbeEventService,
    private moduleAPI: GrowbeModuleAPI,
    private graphService: GrowbeGraphService,
  ) { }

  ngOnInit(): void {
    this.sub = merge(
      this.graphService.getGraph('one', {
        moduleId: this.module.uid,
        growbeId: this.module.mainboardId,
        fields: Object.keys(this.moduleDef.properties),
        liveUpdate: true,
      }).pipe(map((items) => items[0])),
      this.topic.getGrowbeEvent(
        this.module.mainboardId,
        `/cloud/m/${this.module.uid}/data`,
        (d) => Object.assign(JSON.parse(d), { createdAt: new Date() }),
      )
    ).subscribe((data) => (this.data = data));
  }

}
