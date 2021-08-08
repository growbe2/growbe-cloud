import {LifeCycleObserver, lifeCycleObserver, service} from '@loopback/core';
import {Subscription} from 'rxjs';
import {GrowbeVirtualDevice} from './virtual-device.model';
import {GrowbeVirtualDeviceService} from './virtual-device.service';

@lifeCycleObserver('')
export class GrowbeVirtualDeviceObserver implements LifeCycleObserver {
  constructor(
    @service(GrowbeVirtualDeviceService)
    private virtualDeviceService: GrowbeVirtualDeviceService,
  ) {}

  async init(): Promise<void> {}

  async start(): Promise<void> {
	  for (const device of await this.virtualDeviceService.virtualDeviceRepo.find()) {
		  this.virtualDeviceService.startVirtualDevice(device);
	  }
  }

  async stop(): Promise<void> {}
}
