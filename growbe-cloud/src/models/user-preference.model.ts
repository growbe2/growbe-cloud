import { User } from '@berlingoqc/sso/dist/models/user.model';
import {belongsTo, Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserPreference extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @belongsTo(() => User)
  userId: string;

  [prop: string]: any;

  constructor(data?: Partial<UserPreference>) {
    super(data);
  }
}

export interface UserPreferenceRelations {
  // describe navigational properties here
}

export type UserPreferenceWithRelations = UserPreference & UserPreferenceRelations;
