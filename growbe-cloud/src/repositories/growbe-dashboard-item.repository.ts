import {DefaultCrudRepository} from '@loopback/repository';
import {GrowbeDashboardItem, GrowbeDashboardItemRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrowbeDashboardItemRepository extends DefaultCrudRepository<
  GrowbeDashboardItem,
  typeof GrowbeDashboardItem.prototype.id,
  GrowbeDashboardItemRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(GrowbeDashboardItem, dataSource);
  }
}
