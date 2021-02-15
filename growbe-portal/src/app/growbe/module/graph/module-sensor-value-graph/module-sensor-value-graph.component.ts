import { Component, Input, OnInit } from '@angular/core';
import { GrowbeGraphService } from '../service/growbe-graph.service';

@Component({
  selector: 'app-module-sensor-value-graph',
  templateUrl: './module-sensor-value-graph.component.html',
  styleUrls: ['./module-sensor-value-graph.component.scss']
})
export class ModuleSensorValueGraphComponent implements OnInit {

  @Input() data: any;

  chartSerie;

  constructor(
    private graphService: GrowbeGraphService,
  ) { }

  ngOnInit(): void {
    this.chartSerie = this.graphService.getGraph({
    "growbeId": "24DFC-2DAD",
    "moduleType": "thl",
    "from": "2021-02-15T04:45:13.432Z",
    "to": "2021-02-15T04:55:13.432Z",
    "fields": ["airTemperature", "humidity"]
    })
  }
}
