import {ActionCode, FieldAlarm, FieldAlarmEvent} from "@growbe2/growbe-pb";
import {BindingScope, injectable, service} from "@loopback/core";
import {repository} from "@loopback/repository";
import {HttpErrors} from "@loopback/rest";
import {GroupEnum, GrowbeHardwareAlarm, LogTypeEnum, SeverityEnum} from "../models";
import {GrowbeHardwareAlarmRepository} from "../repositories";
import { GrowbeHardwareAlarmEventRepository } from "../repositories/growbe-hardware-alarm-event.repository";
import {GrowbeLogsService} from "./growbe-logs.service";
import {getTopic, MQTTService} from "./mqtt.service";


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
		@repository(GrowbeHardwareAlarmRepository)
		private alarmRepository: GrowbeHardwareAlarmRepository,
		@repository(GrowbeHardwareAlarmEventRepository)
    	private eventRepository: GrowbeHardwareAlarmEventRepository,
	) {}


	getHardwareAlarmEvent(mainboardId: string, moduleId: string, property: string) {
    	return this.eventRepository.find({where: { moduleId, mainboardId, property}, limit: 10, order: ['createdAt DESC']})
	}

	getModuleHardwareAlarms(moduleId: string): Promise<FieldAlarm[]> {
		return this.alarmRepository.findOne({
			where: { moduleId }
		}).then((element) => {
			return Object.values(element?.alarms || {});
		})
	}

	async addHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void> {
		return this.handleModificationAlarm(
			mainboardId,
			alarm,
			`/board/aAl`,
			ActionCode.ADD_ALARM,
			`Alarm on property [${alarm.property}] is created`,
			(moduleAlarm) => {
				if (moduleAlarm.alarms[alarm.property]){
					throw new HttpErrors[409]('already an alarm for this property');
				}
				if (!moduleAlarm.alarms) { moduleAlarm.alarms = {}; }

				moduleAlarm.alarms[alarm.property] = alarm;
			}
		);
	}

	async updateHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void> {
		return this.handleModificationAlarm(
			mainboardId,
			alarm,
			`/board/uAl`,
			ActionCode.SYNC_REQUEST,
			`Alarm on property [${alarm.property}] is updated`,
			(moduleAlarm) => {

				if (!moduleAlarm.alarms[alarm.property]) {
					throw new HttpErrors[404]('');
				}

				moduleAlarm.alarms[alarm.property] = alarm;
			}
		);
	}

	async removeHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void>  {
		return this.handleModificationAlarm(
			mainboardId,
			alarm,
			`/board/rAl`,
			ActionCode.REMOVE_ALARM,
			`Alarm on property [${alarm.property}] is deleted`,
			(moduleAlarm) => {

					if (!moduleAlarm.alarms[alarm.property]) {
						throw new HttpErrors[404]('');
					}

					delete moduleAlarm.alarms[alarm.property];
			}
		);
	}

	private async handleModificationAlarm(
		mainboardId: string,
		alarm: FieldAlarm,
		topic: string,
		responseCode: any,
		msg: string,
		cb: (moduleAlarm: GrowbeHardwareAlarm) => void
	) {
		let moduleAlarm = await this.alarmRepository.findOne({where: { moduleId: alarm.moduleId }})

		if (!moduleAlarm) {
			moduleAlarm = await this.alarmRepository.create({moduleId: alarm.moduleId, alarms: {}})
		}

		cb(moduleAlarm);

		return this.mqttService.sendWithResponse(
			mainboardId,
			getTopic(mainboardId, topic),
			FieldAlarm.encode(alarm).finish(),
			{ waitingTime: 3000, responseCode}
		).toPromise()
		.then(() => this.alarmRepository.update(moduleAlarm as GrowbeHardwareAlarm))
		.then((data) => {
			return this.growbeLogsService.addLog({
				growbeMainboardId: mainboardId,
				group: GroupEnum.MODULES,
				severity: SeverityEnum.MEDIUM,
				type: LogTypeEnum.ALARM,
				newState: {},
				growbeModuleId: alarm.moduleId,
				message: msg,
			}).then(() => data)
		})
		.catch(ex => {
			throw ex;
		})

	}

	/**
	 * handle a alarm receive by the broker
	 * @param growbeMainboardId
	 * @param alarmEvent
	 * @returns
	 */
	async onHardwareAlarm(growbeMainboardId: string, alarmEvent: FieldAlarmEvent) {
		await this.eventRepository.create({
			createdAt: Date.now(),
			event: alarmEvent,
			mainboardId: growbeMainboardId,
			moduleId: alarmEvent.moduleId,
			property: alarmEvent.property,
		})
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
