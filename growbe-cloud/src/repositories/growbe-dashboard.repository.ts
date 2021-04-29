import { inject} from '@loopback/core';
import {
  DefaultCrudRepository,
} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {
  GrowbeDashboard,
  GrowbeDashboardRelations,
} from '../models';

export class GrowbeDashboardRepository extends DefaultCrudRepository<
  GrowbeDashboard,
  typeof GrowbeDashboard.prototype.id,
  GrowbeDashboardRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(GrowbeDashboard, dataSource);
  }
}
