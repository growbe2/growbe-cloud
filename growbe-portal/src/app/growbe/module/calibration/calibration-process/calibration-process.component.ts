import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { CalibrationProcessService } from './calibration-process.service';

@Component({
  selector: 'app-calibration-process',
  templateUrl: './calibration-process.component.html',
  styleUrls: ['./calibration-process.component.scss']
})
export class CalibrationProcessComponent implements OnInit {
  

  growbeId: string;
  moduleId: string;

  process: CalibrationProcessService;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private growbeEventService: GrowbeEventService,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.growbeId = params['growbeId'];
    this.moduleId = params['moduleId']

    this.process = new CalibrationProcessService(this.growbeId, this.moduleId, this.httpClient, this.growbeEventService);
  }

}
