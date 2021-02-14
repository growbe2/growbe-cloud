import { User } from '@berlingoqc/sso';
import { HearthBeath } from '@growbe2/growbe-pb';
import {belongsTo, Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {GrowbeMainboardConfig} from './growbe-mainboard-config.model';
import {GrowbeWarning} from './growbe-warning.model';


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
  userId: string;

  @property()
  lastUpdateAt: any;

  @hasOne(() => GrowbeMainboardConfig)
  growbeMainboardConfig: GrowbeMainboardConfig;

  @hasMany(() => GrowbeWarning)
  growbeWarnings: GrowbeWarning[];

  constructor(data?: Partial<GrowbeMainboard>) {
    super(data);
  }
}

export interface GrowbeMainboardRelations {
  // describe navigational properties here
  user: User;
}

export type GrowbeMainboardWithRelations = GrowbeMainboard & GrowbeMainboardRelations;
