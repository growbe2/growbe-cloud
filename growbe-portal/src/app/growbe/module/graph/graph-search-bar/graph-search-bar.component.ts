import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GrowbeGraphService } from '../service/growbe-graph.service';

@Component({
  selector: 'app-graph-search-bar',
  templateUrl: './graph-search-bar.component.html',
  styleUrls: ['./graph-search-bar.component.scss']
})
export class GraphSearchBarComponent implements OnInit {

  nameMode = 'Mode';
  valueMode = ['period', 'depuis'];
  displayMode = {
    display: (e) => e,
    value: (e) => e,
  };

  controlMode: FormControl;
  formMode: FormGroup;

  mode: 'period' | 'last';

  data;

  constructor(
    private graphService: GrowbeGraphService,
  ) { }

  ngOnInit(): void {
    this.controlMode = new FormControl();

    this.controlMode.valueChanges.subscribe((v) => this.setMode(v));
  }


  private setMode(mode) {
    this.mode = mode;
    this.formMode = (mode === 'period') ?
      new FormGroup({
        from: new FormControl(),
        to: new FormControl(),
      }) :
      new FormGroup({})
  }

}
