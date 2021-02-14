import {DefaultCrudRepository} from '@loopback/repository';
import {GrowbeMainboardConfig, GrowbeMainboardConfigRelations} from '../models';
import {PgsqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrowbeMainboardConfigRepository extends DefaultCrudRepository<
  GrowbeMainboardConfig,
  typeof GrowbeMainboardConfig.prototype.id,
  GrowbeMainboardConfigRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(GrowbeMainboardConfig, dataSource);
  }
}
