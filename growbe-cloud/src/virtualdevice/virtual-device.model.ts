import { Entity, model, property } from "@loopback/repository";


@model()
export class StateTransition {
	@property()
	routineId: string;
}

@model()
export class VirtualDeviceStateRoutineConfig {
	@property.array(() => StateTransition)
	stateTransitionArray: StateTransition[];
	@property()
	atEnding: 'restart' | 'end';
}
@model()
export class VirtualDeviceStateRoutine {
	@property()
	routineName: string;
	@property()
	id: string;
}

@model()
export class ModuleStateChangeRoutine extends VirtualDeviceStateRoutine {
	@property()
	routineName: 'connect_module';
	@property()
	moduleId: string;
	@property()
	atIndex: number;
	@property()
	connected: boolean;
}

@model()
export class HearthBeatWaitRoutine extends VirtualDeviceStateRoutine {
	@property()
	routineName: 'hearthbeath_wait';
	@property()
	waitTime: number;
}

@model({settings: {strict: false}})
export class VirtualDeviceRoutinesMap {[id: string]: VirtualDeviceStateRoutine};

@model()
export class VirtualDeviceConfig {
	@property()
	config: VirtualDeviceStateRoutineConfig;
	@property()
	routines: VirtualDeviceRoutinesMap;
}

@model({settings: {strict: false}})
export class GrowbeVirtualDevice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id: string;

  @property()
  growbeMainboardId: string;

  @property()
  config: VirtualDeviceConfig;

}