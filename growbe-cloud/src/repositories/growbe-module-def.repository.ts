import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {GrowbeModuleDef, GrowbeModuleDefRelations, GrowbeMainboard} from '../models';
import {PgsqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrowbeMainboardRepository} from './growbe-mainboard.repository';

export class GrowbeModuleDefRepository extends DefaultCrudRepository<
  GrowbeModuleDef,
  typeof GrowbeModuleDef.prototype.id,
  GrowbeModuleDefRelations
> {

  public readonly mainboard: BelongsToAccessor<GrowbeMainboard, typeof GrowbeModuleDef.prototype.id>;

  constructor(@inject('datasources.pgsql') dataSource: PgsqlDataSource, @repository.getter('GrowbeMainboardRepository') protected growbeMainboardRepositoryGetter: Getter<GrowbeMainboardRepository>,) {
    super(GrowbeModuleDef, dataSource);
    this.mainboard = this.createBelongsToAccessorFor('mainboard', growbeMainboardRepositoryGetter,);
    this.registerInclusionResolver('mainboard', this.mainboard.inclusionResolver);
  }
}
