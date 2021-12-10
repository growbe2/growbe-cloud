import { ActionCode, FieldAlarm, FieldAlarmEvent } from "@growbe2/growbe-pb";
import { BindingScope, injectable, service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { HttpErrors } from "@loopback/rest";
import { GroupEnum, GrowbeModuleDef, LogTypeEnum, SeverityEnum } from "../models";
import { GrowbeModuleDefRepository, GrowbeModuleRepository } from "../repositories";
import { GrowbeLogsService } from "./growbe-logs.service";
import { getTopic, MQTTService } from "./mqtt.service";


export const AlarmZoneArray = [
	'unknow', 'middle', 'very_low', 'low', 'high', 'very_high'
];



@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeHardwareAlarmService {
	constructor(
		@service(MQTTService)
		public mqttService: MQTTService,
		@service(GrowbeLogsService)
		private growbeLogsService: GrowbeLogsService,
		@repository(GrowbeModuleRepository)
		private moduleRepository: GrowbeModuleRepository,
		@repository(GrowbeModuleDefRepository)
		private moduleDefRepository: GrowbeModuleDefRepository,

	) {}


	async addHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void> {
		// get the module def end add FieldAlarm to it
		const module = await this.moduleRepository.findOne({
			where: { id: alarm.moduleId},
			include: [ 'moduleDef' ]
		});
		if (!module) {
			throw new HttpErrors[404]('');
		}

		if(module.moduleDef?.properties[alarm.property]) {
			module.moduleDef.properties[alarm.property].alarm = alarm;
		}
		await this.mqttService.sendWithResponse(
			mainboardId,
			getTopic(mainboardId, `/board/aAl`),
			FieldAlarm.encode(alarm).finish(),
			{ waitingTime: 3000, responseCode: ActionCode.ADD_ALARM}
		).toPromise()
		return this.moduleDefRepository.update(module.moduleDef as GrowbeModuleDef);
	}

	async removeHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void>  {
		// get the module def end add FieldAlarm to it
		const module = await this.moduleRepository.findOne({
			where: { id: alarm.moduleId},
			include: [ 'moduleDef' ]
		});
		if (!module) {
			throw new HttpErrors[404]('');
		}

		if(module.moduleDef?.properties[alarm.property]) {
			module.moduleDef.properties[alarm.property].alarm = undefined;
		}
		return this.mqttService.sendWithResponse(
			mainboardId,
			getTopic(mainboardId, `/board/rAl`),
			FieldAlarm.encode(alarm).finish(),
			{ waitingTime: 3000, responseCode: ActionCode.REMOVE_ALARM}
		).toPromise()
		.then((response) => this.moduleDefRepository.update(module.moduleDef as GrowbeModuleDef));
	}

	/**
	 * handle a alarm receive by the broker 
	 * @param growbeMainboardId 
	 * @param alarmEvent 
	 * @returns 
	 */
	async onHardwareAlarm(growbeMainboardId: string, alarmEvent: FieldAlarmEvent) {
		return this.growbeLogsService.addLog({
			growbeMainboardId,
			group: GroupEnum.MODULES,
			severity: SeverityEnum.MEDIUM,
			type: LogTypeEnum.ALARM,
			newState: alarmEvent,
			growbeModuleId: alarmEvent.moduleId,
			message: `alarm for ${alarmEvent.property} transition from ${AlarmZoneArray[alarmEvent.previousZone]} at ${alarmEvent.previousValue} to ${AlarmZoneArray[alarmEvent.currentZone]} at ${alarmEvent.currentValue}`,
		});
	}
}