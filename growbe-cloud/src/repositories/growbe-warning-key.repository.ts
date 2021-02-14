import {DefaultCrudRepository} from '@loopback/repository';
import {GrowbeWarningKey, GrowbeWarningKeyRelations} from '../models';
import {PgsqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrowbeWarningKeyRepository extends DefaultCrudRepository<
  GrowbeWarningKey,
  typeof GrowbeWarningKey.prototype.key,
  GrowbeWarningKeyRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(GrowbeWarningKey, dataSource);
  }
}
