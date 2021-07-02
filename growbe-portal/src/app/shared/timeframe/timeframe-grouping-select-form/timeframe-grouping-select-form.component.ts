import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';

@Component({
  selector: 'app-timeframe-grouping-select-form',
  templateUrl: './timeframe-grouping-select-form.component.html',
  styleUrls: ['./timeframe-grouping-select-form.component.scss']
})
export class TimeframeGroupingSelectFormComponent implements OnInit {


  formGroup: FormGroup;
  formData: AutoFormData = {
    type: 'simple',
    actionsButtons: {},
    items: [
      {
        type: 'object',
        name: 'object',
        templates: {
          header: 'Grouping (Optional)'
        },
        properties: [
          {
            type: 'number',
            name: 'intervalValue'
          },
          {
            type: 'string',
            name: 'intervalUnit',
            component: {
              name: 'select',
              type: 'mat',
              options: {
                displayContent: (e) => e.name,
                options: {
                  value: () => of([
                    { name: 'Year', value: 'year'},
                    { name: 'Month', value: 'month'},
                    { name: 'Day of Year', value: 'dayOfYear'},
                    { name: 'Hour', value: 'hour'},
                    { name: 'Minute', value: 'minute'}
                  ]),
                }
              }
            } as any,
          }
        ]
      }
    ],
    event: {
      submit: () => {},
      afterFormCreated: (fg) => (this.formGroup = fg),
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  getValue() {
    return this.formGroup.value;
  }

}
