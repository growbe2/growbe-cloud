import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-growbe-manager-detail',
  templateUrl: './growbe-manager-detail.component.html',
  styleUrls: ['./growbe-manager-detail.component.scss']
})
export class GrowbeManagerDetailComponent implements OnInit {

  mainboard: any;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.mainboard = this.activatedRoute.snapshot.data.mainboard;
  }

}
