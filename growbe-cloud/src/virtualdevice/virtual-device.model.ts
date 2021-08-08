import { Entity, model, property } from "@loopback/repository";


export class VirtualDeviceStateRoutineConfig {

}


export class VirtualDeviceStateRoutine {

}

@model()
export class VirtualDeviceConfig {
	@property()
	config: VirtualDeviceStateRoutineConfig;
	[state: string]: VirtualDeviceStateRoutine;
}

@model({settings: {strict: false}})
export class GrowbeVirtualDevice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  growbeMainboardId: string;

  @property()
  config: VirtualDeviceConfig;

}