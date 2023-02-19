import { Component, OnInit } from '@angular/core';
import {DashboardRegistryItem, DashboardRegistryService} from '../../registry';

@Component({
  selector: 'lib-registery-store',
  templateUrl: './registery-store.component.html',
  styleUrls: ['./registery-store.component.css']
})
export class RegisteryStoreComponent implements OnInit {

  items: DashboardRegistryItem[];

  constructor(
    private registeryService: DashboardRegistryService,
  ) {}

  ngOnInit(): void {
    this.items = this.registeryService.getRegistryItems();
  }
}
