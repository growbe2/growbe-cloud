import { FieldAlarm } from "@growbe2/growbe-pb";
import { moduleId } from "./data";

export const fieldAlarmValidTHL = FieldAlarm.create({
	moduleId,
	property: "airTemperature",
	high: {
		value: 28,
		offset: 1,
	},
	low: {
		value: 20,
		offset: 1
	}
});