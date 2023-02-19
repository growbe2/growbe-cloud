import { Component, Input } from '@angular/core';
import {DashboardRegistryItem, DashboardRegistryService} from '../../registry';

@Component({
  selector: 'lib-registery-item',
  templateUrl: './registery-item.component.html',
  styleUrls: ['./registery-item.component.css']
})
export class RegisteryItemComponent {

  @Input() item: DashboardRegistryItem;

  constructor(
  ) {}

}
