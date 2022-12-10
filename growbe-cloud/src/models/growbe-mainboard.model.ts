import {User} from '@berlingoqc/sso';
import {
  belongsTo,
  Entity,
  model,
  property,
  hasOne,
  hasMany,
  Model,
} from '@loopback/repository';
import {GrowbeMainboardConfig} from './growbe-mainboard-config.model';
import {GrowbeWarning} from './growbe-warning.model';
import {GrowbeSensorValue} from './growbe-sensor-value.model';
import {GrowbeModule} from './growbe-module.model';
import {GrowbeLogs} from './growbe-logs.model';
import {GrowbeModuleDef} from './growbe-module-def.model';
import {VirtualRelay} from './virtual-relay.model';
import { HostInformation } from '@growbe2/growbe-pb';
import { DeviceLogs } from '../component/device-logs';
import {EnvironmentControllerState} from './environment-controller-state.model';

export type GrowbeState = 'CONNECTED' | 'DISCONNECTED';

@model()
export class GrowbeMainboard extends Entity {
  @property({id: true, generated: false})
  id: string;

  @property()
  name: string;

  @property({type: 'string'})
  state: GrowbeState;

  @belongsTo(() => User)
  userId?: string;

  @belongsTo(() => User)
  organisationId?: string;

  @property()
  lastUpdateAt: Date;

  @property()
  version: string;

  @property()
  cloudVersion: string;

  @property.array("object")
  boards: {imple: string, addr: string}[];

  @property(() => "object")
  // pb.HostInformation
  host: any;

  @hasOne(() => GrowbeMainboardConfig)
  growbeMainboardConfig: GrowbeMainboardConfig;

  @hasMany(() => GrowbeWarning)
  growbeWarnings: GrowbeWarning[];

  @hasMany(() => GrowbeSensorValue)
  growbeSensorValues: GrowbeSensorValue[];

  @hasMany(() => GrowbeModule, {keyTo: 'mainboardId'})
  growbeModules: GrowbeModule[];

  @hasMany(() => GrowbeLogs)
  growbeLogs: GrowbeLogs[];

  @hasMany(() => GrowbeModuleDef, {keyTo: 'mainboardId'})
  growbeModuleDefs: GrowbeModuleDef[];

  @hasMany(() => VirtualRelay)
  virtualRelays: VirtualRelay[];

  @hasMany(() => DeviceLogs, {keyTo: 'mainboardId'})
  deviceLogs: DeviceLogs[];

  @hasMany(() => EnvironmentControllerState, {keyTo: 'growbeId'})
  environmentControllerStates: EnvironmentControllerState[];

  constructor(data?: Partial<GrowbeMainboard>) {
    super(data);
  }
}

export interface GrowbeMainboardRelations {
  // describe navigational properties here
  user: User;
}

export type GrowbeMainboardWithRelations = GrowbeMainboard &
  GrowbeMainboardRelations;
