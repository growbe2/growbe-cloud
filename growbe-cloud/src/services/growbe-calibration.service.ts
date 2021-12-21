import { ActionCode, SOILCalibrationStart, SOILCalibrationStep, SOILCalibrationStepEvent } from "@growbe2/growbe-pb";
import { BindingScope, injectable, service } from "@loopback/core";
import { getTopic, GrowbeLogsService, MQTTService } from ".";

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeCalibrationService {
	constructor(
		@service(MQTTService)
		public mqttService: MQTTService,
		@service(GrowbeLogsService)
		private growbeLogsService: GrowbeLogsService,
	) {}


    // FOR THE WATCHER

    async onCalibrationEvent(
        mainboardId: string,
        moduleId: string,
        event: SOILCalibrationStepEvent, 
    ) {
        return this.mqttService.send(
            getTopic(mainboardId, `/cloud/m/${moduleId}/calibrationEvent`),
            JSON.stringify(event)
        );
    }


    // FOR THE CLOUD

    async startCalibration(
        mainboardId: string,
        moduleId: string,
        event: SOILCalibrationStart, 
    ) {
        return this.mqttService
            .sendWithResponse(
                mainboardId,
                getTopic(mainboardId, `/board/startCalibration/${moduleId}`),
                "{}",
                { waitingTime: 6000, responseCode: ActionCode.SYNC_REQUEST}
            ).toPromise();
    }

    async setStepCalibration(
        mainboardId: string,
        moduleId: string,
        event: SOILCalibrationStep, 
    ) {
        const payload = SOILCalibrationStep.encode(event).finish();
        return this.mqttService
            .sendWithResponse(
                mainboardId,
                getTopic(mainboardId, `/board/setCalibration/${moduleId}`),
                payload,
                { waitingTime: 6000, responseCode: ActionCode.SYNC_REQUEST}
            ).toPromise();
    }

    async statusCalibration(
        mainboardId: string,
        moduleId: string,
    ) {
        return this.mqttService
            .sendWithResponse(
                mainboardId,
                getTopic(mainboardId, `/board/statusCalibration/${moduleId}`),
                "{}",
                { waitingTime: 6000, responseCode: ActionCode.SYNC_REQUEST}
            ).toPromise();
    }

    async confirmCalibration(
        mainboardId: string,
        moduleId: string,
    ) {
        return this.mqttService
            .sendWithResponse(
                mainboardId,
                getTopic(mainboardId, `/board/terminateCalibration/${moduleId}`),
                "{}",
                { waitingTime: 6000, responseCode: ActionCode.SYNC_REQUEST}
            ).toPromise(); 
    }

    async cancelCalibration(
        mainboardId: string,
        moduleId: string,
    ) {
        return this.mqttService
            .sendWithResponse(
                mainboardId,
                getTopic(mainboardId, `/board/cancelCalibration/${moduleId}`),
                "{}",
                { waitingTime: 6000, responseCode: ActionCode.SYNC_REQUEST}
            ).toPromise(); 
    }





}