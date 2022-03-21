import { ActionResponse } from "@growbe2/growbe-pb";
import { Application } from "@loopback/core";
import { filter, Subscription } from "rxjs";
import { MQTTService } from "../../services";



export class MainboardMQTTester {

	receiveTopic: {[id: string]: any} = {};

	subs: Subscription[] = [];

	constructor(public id: string, private mqttService: MQTTService) {}

	responseAt(topic: string, cbResponse: (response: ActionResponse) => void) {
		this.mqttService.addSubscription(topic);
		this.subs.push(this.mqttService.observable.pipe(
			filter(x => {
				return x.topic === topic
			})
		).subscribe(({message}) => {
			this.receiveTopic[topic] = message;
			const response = ActionResponse.create({});
			cbResponse(response);
			const body = ActionResponse.encode(response).finish();
			this.mqttService.send(topic + '/response', body).then(() => {});
		}));
	}

	clear() {
		this.subs?.forEach((s) => s.unsubscribe());
		this.subs = [];
		this.receiveTopic = {};
	}
}


export async function getMainboardMQTT(id: string, app: Application): Promise<MainboardMQTTester> {
	const mqtt = (await app.get('services.MQTTService')) as MQTTService;
	const mqttTester: MainboardMQTTester = new MainboardMQTTester(id, mqtt);
	return mqttTester;
}