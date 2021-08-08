import { BindingScope, injectable } from "@loopback/context";
import { repository } from "@loopback/repository";
import { Observable, Subscription } from "rxjs";
import { GrowbeVirtualDevice } from "./virtual-device.model";
import { GrowbeVirtualDeviceRepository } from "./virtual-device.repository";

@injectable({scope: BindingScope.SINGLETON})
export class GrowbeVirtualDeviceService {
  	virtualDeviceTasks: {[id: string]: {ctx: GrowbeVirtualDevice; sub: Subscription}} = {};

	constructor(
		@repository(GrowbeVirtualDeviceRepository)
		public virtualDeviceRepo: GrowbeVirtualDeviceRepository,
	) {}



	addVirtualDevice(device: GrowbeVirtualDevice) {
		return this.virtualDeviceRepo.create(device).then((newDevice) => {
			this.startVirtualDevice(newDevice);
			return newDevice;
		});
	}

	removeVirtualDevice(id: string) {
		return this.virtualDeviceRepo.deleteById(id).then(() => this.stopVirtualDevice(id))
	}


	startVirtualDevice(device: GrowbeVirtualDevice): void {
		if (this.virtualDeviceTasks[device.id]) {
			this.stopVirtualDevice(device.id);
		}
		this.virtualDeviceTasks[device.id] = {
			ctx: device,
			sub: taskVirtualDevice(device).subscribe(() => {}),
		};
	}


	stopVirtualDevice(id: string): void {
		this.virtualDeviceTasks[id]?.sub.unsubscribe();
		delete this.virtualDeviceTasks[id];
	}
}

function taskVirtualDevice(device: GrowbeVirtualDevice) {
	return new Observable((obs) => {
		console.log('STARTING VD', device);
	});
}