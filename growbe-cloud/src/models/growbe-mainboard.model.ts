import { User } from '@berlingoqc/sso';
import {belongsTo, Entity, model, property} from '@loopback/repository';

@model()
export class GrowbeMainboard extends Entity {

  @property({id: true, generated: false})
  id: string;

  @property()
  name: string;

  @belongsTo(() => User)
  userId: string;

  @property()
  lastUpdateAt: Date;

  constructor(data?: Partial<GrowbeMainboard>) {
    super(data);
  }
}

export interface GrowbeMainboardRelations {
  // describe navigational properties here
  user: User;
}

export type GrowbeMainboardWithRelations = GrowbeMainboard & GrowbeMainboardRelations;
