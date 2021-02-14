import {Entity, model, property, belongsTo} from '@loopback/repository';
import {GrowbeWarningKey} from './growbe-warning-key.model';

@model()
export class GrowbeWarning extends Entity {

  @property({id: true, generated: true})
  id: number;

  @property({
    type: 'string',
  })
  growbeMainboardId?: string;

  @belongsTo(() => GrowbeWarningKey)
  warningKeyId: string;

  @property()
  text: string;

  @property()
  data: any;

  @property()
  createdAt: Date;

  constructor(data?: Partial<GrowbeWarning>) {
    super(data);
  }
}

export interface GrowbeWarningRelations {
  // describe navigational properties here
  warningKey: GrowbeWarningKey;
}

export type GrowbeWarningWithRelations = GrowbeWarning & GrowbeWarningRelations;
