import { FieldAlarmEvent } from "@growbe2/growbe-pb";
import { BindingScope, injectable, service } from "@loopback/core";
import { GroupEnum, LogTypeEnum, SeverityEnum } from "../models";
import { GrowbeLogsService } from "./growbe-logs.service";

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeHardwareAlarmService {
	constructor(
		@service(GrowbeLogsService)
		private growbeLogsService: GrowbeLogsService,
	) {}


	async onHardwareAlarm(growbeMainboardId: string, alarmEvent: FieldAlarmEvent) {
		console.log()
		return this.growbeLogsService.addLog({
			growbeMainboardId,
			group: GroupEnum.MODULES,
			severity: SeverityEnum.MEDIUM,
			type: LogTypeEnum.ALARM,
			newState: alarmEvent,
			message: `alarm for ${alarmEvent.property} transition from ${alarmEvent.previousZone} to ${alarmEvent.currentZone}`,
		});
	}
}