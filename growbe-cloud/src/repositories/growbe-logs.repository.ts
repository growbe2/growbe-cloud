import {DefaultCrudRepository} from '@loopback/repository';
import {GrowbeLogs, GrowbeLogsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrowbeLogsRepository extends DefaultCrudRepository<
  GrowbeLogs,
  typeof GrowbeLogs.prototype.id,
  GrowbeLogsRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(GrowbeLogs, dataSource);
  }
}
