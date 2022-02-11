import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


export interface RelayControl {
  getValues(): Observable<[any, any, any, boolean]>;
  changeManualState(state: boolean): Observable<void>;
}

@Component({
  selector: 'app-relay-base-control',
  templateUrl: './relay-base-control.component.html',
  styleUrls: ['./relay-base-control.component.scss']
})
export class RelayBaseControlComponent implements OnInit {

  @Input() control: RelayControl;
  @Input() mainboardId: string;

  value$: Observable<any[]>;

  requestConfig: Subscription;

  constructor() { }

  async ngOnInit() {
    // faut que j'aille chercher la config et l'etat de cette propriétés
    this.value$ = this.control.getValues();
  }

  onSlideState(change: MatSlideToggleChange) {
    this.requestConfig = this.control.changeManualState(change.checked).subscribe(() => {
      this.requestConfig = null;
    }, (error) => {
      this.requestConfig = null;
      // return the state of the slide to the previous one
    });
  }

}
