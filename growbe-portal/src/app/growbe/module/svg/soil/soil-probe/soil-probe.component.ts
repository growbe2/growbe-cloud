import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'g[soil-probe]',
  templateUrl: './soil-probe.component.svg',
  styleUrls: ['./soil-probe.component.scss']
})
export class SoilProbeComponent implements OnInit {


  @Input() position: 'left' | 'right' | 'bottom'

  constructor() { }

  ngOnInit(): void {
  }

}
