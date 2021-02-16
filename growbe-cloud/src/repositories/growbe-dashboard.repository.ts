import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {GrowbeDashboard, GrowbeDashboardRelations, GrowbeDashboardItem} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrowbeDashboardItemRepository} from './growbe-dashboard-item.repository';

export class GrowbeDashboardRepository extends DefaultCrudRepository<
  GrowbeDashboard,
  typeof GrowbeDashboard.prototype.id,
  GrowbeDashboardRelations
> {

  public readonly growbeDashboardItems: HasManyRepositoryFactory<GrowbeDashboardItem, typeof GrowbeDashboard.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GrowbeDashboardItemRepository') protected growbeDashboardItemRepositoryGetter: Getter<GrowbeDashboardItemRepository>,
  ) {
    super(GrowbeDashboard, dataSource);
    this.growbeDashboardItems = this.createHasManyRepositoryFactoryFor('growbeDashboardItems', growbeDashboardItemRepositoryGetter,);
    this.registerInclusionResolver('growbeDashboardItems', this.growbeDashboardItems.inclusionResolver);
  }
}
