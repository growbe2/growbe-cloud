import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig, OnDestroyMixin } from "@berlingoqc/ngx-common";
import { Subscription } from "rxjs";
import { GrowbeEventService } from "src/app/growbe/services/growbe-event.service";


export interface CalibrationEvent {
    status: string;
}


export class CalibrationProcessService {

    step: string;
    currentState: any;
    valuesLow: any[];
    valuesHigh: any[];

    sub: Subscription;


    private get basePath() { return  `${envConfig.growbeCloud}/growbe/${this.growbeId}/modules/${this.moduleId}/calibration` }

    constructor(
        private growbeId: string,
        private moduleId: string,
        private httpClient: HttpClient,
        private growbeEventService: GrowbeEventService,
    ) {
    }

    startCalibration() {
        this.sub = this.growbeEventService.getGrowbeEvent(
            this.growbeId,
            `/cloud/m/${this.moduleId}/calibrationEvent`,
            (d) => JSON.parse(d),
        ).subscribe((value) => {
            this.currentState = value.status;
            this.step = value.step;
            if (value.low) {
                this.valuesLow = value.low;
            }
            if (value.high) {
                this.valuesHigh = value.high;
            }
        });

        return this.httpClient.patch(`${this.basePath}/start`, {});
    }

    statusCalibration() {
        return this.httpClient.patch(`${this.basePath}/status`, {});
    }

    cancelCalibration() {
        return this.httpClient.patch(`${this.basePath}/cancel`, {});
    }

    confirmCalibration() {
        return this.httpClient.patch(`${this.basePath}/confirm`, {});
    }

    setCalibrationState(state: number) {
        return this.httpClient.patch(`${this.basePath}/set`, { requestedStep: state })
    }

}