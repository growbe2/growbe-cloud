import { Component, OnInit } from '@angular/core';
import { AutoFormData } from '@berlingoqc/ngx-autoform';

@Component({
  selector: 'app-timeframe-select',
  templateUrl: './timeframe-select.component.html',
  styleUrls: ['./timeframe-select.component.scss']
})
export class TimeframeSelectComponent implements OnInit {


  absoluteFormData: AutoFormData = {
    type: 'simple',
    items: [
      {
        name: 'object',
        type: 'object',
        properties: [
          {
            name: 'absoluteRange',
            type: 'date',
          }
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
