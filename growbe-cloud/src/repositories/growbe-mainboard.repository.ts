import {BelongsToAccessor, DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {GrowbeMainboard, GrowbeMainboardRelations, GrowbeMainboardConfig, GrowbeWarning} from '../models';
import {PgsqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import { UserRepository, User } from '@berlingoqc/sso';
import {GrowbeMainboardConfigRepository} from './growbe-mainboard-config.repository';
import {GrowbeWarningRepository} from './growbe-warning.repository';

export class GrowbeMainboardRepository extends DefaultCrudRepository<
  GrowbeMainboard,
  typeof GrowbeMainboard.prototype.id,
  GrowbeMainboardRelations
> {

  user: BelongsToAccessor<User, typeof GrowbeMainboard.prototype.id>;

  public readonly growbeMainboardConfig: HasOneRepositoryFactory<GrowbeMainboardConfig, typeof GrowbeMainboard.prototype.id>;

  public readonly growbeWarnings: HasManyRepositoryFactory<GrowbeWarning, typeof GrowbeMainboard.prototype.id>;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @repository.getter('repositories.UserRepository') userGetter: Getter<UserRepository>, @repository.getter('GrowbeMainboardConfigRepository') protected growbeMainboardConfigRepositoryGetter: Getter<GrowbeMainboardConfigRepository>, @repository.getter('GrowbeWarningRepository') protected growbeWarningRepositoryGetter: Getter<GrowbeWarningRepository>,
  ) {
    super(GrowbeMainboard, dataSource);
    this.growbeWarnings = this.createHasManyRepositoryFactoryFor('growbeWarnings', growbeWarningRepositoryGetter,);
    this.registerInclusionResolver('growbeWarnings', this.growbeWarnings.inclusionResolver);
    this.growbeMainboardConfig = this.createHasOneRepositoryFactoryFor('growbeMainboardConfig', growbeMainboardConfigRepositoryGetter);
    this.registerInclusionResolver('growbeMainboardConfig', this.growbeMainboardConfig.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
