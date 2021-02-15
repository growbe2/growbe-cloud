import { Component, OnInit } from '@angular/core';
import { GrowbeGraphService } from '../service/growbe-graph.service';

@Component({
  selector: 'app-graph-search-bar',
  templateUrl: './graph-search-bar.component.html',
  styleUrls: ['./graph-search-bar.component.scss']
})
export class GraphSearchBarComponent implements OnInit {


  data;

  constructor(
    private graphService: GrowbeGraphService,
  ) { }

  ngOnInit(): void {
    this.data = this.graphService.getGraph({
    "growbeId": "24DFC-2DAD",
    "moduleType": "thl",
    "from": "2021-02-15T04:45:13.432Z",
    "to": "2021-02-15T04:55:13.432Z",
    "fields": ["airTemperature", "humidity"]
    })
  }

}
