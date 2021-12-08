import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-growbe-local-connection',
  templateUrl: './growbe-local-connection.component.html',
  styleUrls: ['./growbe-local-connection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class GrowbeLocalConnectionComponent implements OnInit {

  @Input() localConnection: any;

  constructor() { }

  ngOnInit(): void {}

}
