import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-module-graph',
  templateUrl: './widget-module-graph.component.html',
  styleUrls: ['./widget-module-graph.component.scss']
})
export class WidgetModuleGraphComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
