import {ActionCode, FieldAlarm, FieldAlarmEvent} from "@growbe2/growbe-pb";
import {BindingScope, injectable, service} from "@loopback/core";
import {repository} from "@loopback/repository";
import {HttpErrors} from "@loopback/rest";
import {GroupEnum, GrowbeHardwareAlarm, LogTypeEnum, SeverityEnum} from "../models";
import {GrowbeHardwareAlarmRepository} from "../repositories";
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
	) {}


	getModuleHardwareAlarms(moduleId: string): Promise<FieldAlarm[]> {
		return this.alarmRepository.findOne({
			where: { moduleId }
		}).then((element) => {
			return element?.alarms || [];
		})
	}

	async addHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void> {
		return this.handleModificationAlarm(
			mainboardId,
			alarm,
			(moduleAlarm) => {
				if (moduleAlarm.alarms.findIndex(x => x.property === alarm.property) !== -1){
					throw new HttpErrors[409]('already an alarm for this property');
				}
				if (!moduleAlarm.alarms) { moduleAlarm.alarms = []; }

				moduleAlarm.alarms.push(alarm);
			}
		);
	}

	async updateHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void> {
		return this.handleModificationAlarm(
			mainboardId,
			alarm,
			(moduleAlarm) => {
				const index = moduleAlarm.alarms.findIndex(x => x.property === alarm.property);

				if (index === -1) {
					throw new HttpErrors[404]('');
				}

				moduleAlarm.alarms[index] = alarm;
			}
		);
	}

	async removeHardwareAlarm(mainboardId: string, alarm: FieldAlarm): Promise<void>  {
		return this.handleModificationAlarm(
			mainboardId,
			alarm,
			(moduleAlarm) => {
					const index = moduleAlarm.alarms.findIndex(x => x.property === alarm.property);

					if (index === -1) {
						throw new HttpErrors[404]('');
					}

					moduleAlarm.alarms.splice(index, 1);
			}
		);
	}

	private async handleModificationAlarm(
		mainboardId: string,
		alarm: FieldAlarm,
		cb: (moduleAlarm: GrowbeHardwareAlarm) => void
	) {
		const moduleAlarm = await this.alarmRepository.findOne({where: { moduleId: alarm.moduleId }})

		if (!moduleAlarm) {
			throw new HttpErrors[404]('');
		}

		cb(moduleAlarm);

		return this.mqttService.sendWithResponse(
			mainboardId,
			getTopic(mainboardId, `/board/rAl`),
			FieldAlarm.encode(alarm).finish(),
			{ waitingTime: 3000, responseCode: ActionCode.REMOVE_ALARM}
		).toPromise()
		.then(() => this.alarmRepository.update(moduleAlarm))
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
