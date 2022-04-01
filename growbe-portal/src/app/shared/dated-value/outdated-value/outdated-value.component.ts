import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export const isDateOutdated = (createdAt: Date, validFor: number) => {
  if (typeof(createdAt) === "string") {
    createdAt = new Date(createdAt);
  }
  return (Date.now() - validFor) > createdAt.getTime();
}

@Component({
  selector: 'app-outdated-value',
  templateUrl: './outdated-value.component.html',
  styleUrls: ['./outdated-value.component.scss']
})
export class OutdatedValueComponent implements OnInit {

  isOutdated: boolean;

  dateFormat: string = 'shortTime'

  _createdAt: Date;

  @Input() set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
    if (typeof(createdAt) === "string") {
      this._createdAt = new Date(createdAt);
    }
    this.isOutdated = isDateOutdated(this._createdAt, this.validFor);

    const differenceTime = Date.now() - this._createdAt.getTime();
    if (differenceTime >= (24*60*60*1000)) {
      this.dateFormat = 'short'
    }
  }

  get  createdAt() {
    return this._createdAt;
  }
  // validity of data in milliseconds
  @Input() validFor: number = 60 * 1000;
  @Input() connected: boolean;

  constructor() { }

  ngOnInit(): void {}

}
