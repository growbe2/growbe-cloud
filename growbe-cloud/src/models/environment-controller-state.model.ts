import {SCConditionActor} from '@growbe2/growbe-pb';
import {Entity, model, property} from '@loopback/repository';

@model()
export class EnvironmentControllerState extends Entity {

  @property({id: true, generated: false})
  id: string;

  @property()
  state: boolean;

  @property()
  config: any;

  @property({
    type: 'string',
  })
  growbeId?: string;

  constructor(data?: Partial<EnvironmentControllerState>) {
    super(data);
  }
}

export interface EnvironmentControllerStateRelations {
  // describe navigational properties here
}

export type EnvironmentControllerStateWithRelations = EnvironmentControllerState & EnvironmentControllerStateRelations;
