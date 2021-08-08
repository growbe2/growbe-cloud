import { Binding, Component, CoreBindings, inject } from "@loopback/core";
import { ApplicationWithRepositories } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import { GrowbeMainboardBindings } from "../keys";
import { GrowbeVirtualDeviceController } from "./virtual-device.controller";
import { GrowbeVirtualDevice } from "./virtual-device.model";
import { GrowbeVirtualDeviceRepository } from "./virtual-device.repository";
import { GrowbeVirtualDeviceService } from "./virtual-device.service";
import { GrowbeVirtualDeviceObserver } from './virtual-device.observer';


export class VirtualDeviceComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: RestApplication & ApplicationWithRepositories,
  ) {}

  models = [GrowbeVirtualDevice];
  repositories = [GrowbeVirtualDeviceRepository]
  controllers = [GrowbeVirtualDeviceController];
  services = [GrowbeVirtualDeviceService];
  lifeCycleObservers = [GrowbeVirtualDeviceObserver];
  bindings = [
    Binding.bind(GrowbeMainboardBindings.WATCHERS).to([]),
  ];
}