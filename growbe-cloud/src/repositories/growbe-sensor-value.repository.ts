import {DefaultCrudRepository} from '@loopback/repository';
import {GrowbeSensorValue, GrowbeSensorValueRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrowbeSensorValueRepository extends DefaultCrudRepository<
  GrowbeSensorValue,
  typeof GrowbeSensorValue.prototype.id,
  GrowbeSensorValueRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(GrowbeSensorValue, dataSource);
  }
}
