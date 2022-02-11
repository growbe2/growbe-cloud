import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {VirtualRelay, VirtualRelayRelations, GrowbeMainboard} from '../models';
import {GrowbeMainboardRepository} from './growbe-mainboard.repository';

export class VirtualRelayRepository extends DefaultCrudRepository<
  VirtualRelay,
  typeof VirtualRelay.prototype.id,
  VirtualRelayRelations
> {

  public readonly growbeMainboard: BelongsToAccessor<GrowbeMainboard, typeof VirtualRelay.prototype.id>;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource, @repository.getter('GrowbeMainboardRepository') protected growbeMainboardRepositoryGetter: Getter<GrowbeMainboardRepository>,
  ) {
    super(VirtualRelay, dataSource);
    this.growbeMainboard = this.createBelongsToAccessorFor('growbeMainboard', growbeMainboardRepositoryGetter,);
    this.registerInclusionResolver('growbeMainboard', this.growbeMainboard.inclusionResolver);
  }
}
