import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {UserPreference, UserPreferenceRelations} from '../models';

export class UserPreferenceRepository extends DefaultCrudRepository<
  UserPreference,
  typeof UserPreference.prototype.id,
  UserPreferenceRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(UserPreference, dataSource);
  }
}
