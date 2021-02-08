import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {GrowbeMainboard, GrowbeMainboardRelations} from '../models';
import {PgsqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import { UserRepository, User } from '@berlingoqc/sso';

export class GrowbeMainboardRepository extends DefaultCrudRepository<
  GrowbeMainboard,
  typeof GrowbeMainboard.prototype.id,
  GrowbeMainboardRelations
> {

  user: BelongsToAccessor<User, typeof GrowbeMainboard.prototype.id>;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @repository.getter('repositories.UserRepository') userGetter: Getter<UserRepository>
  ) {
    super(GrowbeMainboard, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
