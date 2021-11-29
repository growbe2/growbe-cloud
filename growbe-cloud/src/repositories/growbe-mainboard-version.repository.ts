import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {GrowbeMainboardVersion, GrowbeMainboardVersionRelations} from '../models';

export class GrowbeMainboardVersionRepository extends DefaultCrudRepository<
  GrowbeMainboardVersion,
  typeof GrowbeMainboardVersion.prototype.id,
  GrowbeMainboardVersionRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(GrowbeMainboardVersion, dataSource);
  }
}
