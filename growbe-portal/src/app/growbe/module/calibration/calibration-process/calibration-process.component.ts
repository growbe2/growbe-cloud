import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { ComponentCanDeactivate } from './calibration-process.guard';
import { CalibrationProcessService } from './calibration-process.service';

@Component({
  selector: 'app-calibration-process',
  templateUrl: './calibration-process.component.html',
  styleUrls: ['./calibration-process.component.scss']
})
export class CalibrationProcessComponent implements OnInit, ComponentCanDeactivate {
  
  growbeId: string;
  moduleId: string;

  process: CalibrationProcessService;
  
  isDoneSuccessfully: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private growbeEventService: GrowbeEventService,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.growbeId = params['growbeId'];
    this.moduleId = params['moduleId']

    this.process = new CalibrationProcessService(this.growbeId, this.moduleId, this.httpClient, this.growbeEventService);
    this.process.startCalibration().subscribe();
  }

  canDeactivate() {
    return this.isDoneSuccessfully ? of(true) : this.process.cancelCalibration().pipe(map(() => true));
  }

  startDry() {
    this.process.setCalibrationState(1).subscribe();
  }

  stop() {
    this.process.setCalibrationState(0).subscribe();
  }

  startWet() {
    this.process.setCalibrationState(2).subscribe();
  }

  confirm() {
    this.process.confirmCalibration().subscribe(() => {
      this.isDoneSuccessfully = true;
    });
  }

}
