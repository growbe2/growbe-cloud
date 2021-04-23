import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  GrowbeWarning,
  GrowbeWarningRelations,
  GrowbeWarningKey,
} from '../models';
import {PgsqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrowbeWarningKeyRepository} from './growbe-warning-key.repository';

export class GrowbeWarningRepository extends DefaultCrudRepository<
  GrowbeWarning,
  typeof GrowbeWarning.prototype.id,
  GrowbeWarningRelations
> {
  public readonly warningKey: BelongsToAccessor<
    GrowbeWarningKey,
    typeof GrowbeWarning.prototype.id
  >;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @repository.getter('GrowbeWarningKeyRepository')
    protected growbeWarningKeyRepositoryGetter: Getter<GrowbeWarningKeyRepository>,
  ) {
    super(GrowbeWarning, dataSource);
    this.warningKey = this.createBelongsToAccessorFor(
      'warningKey',
      growbeWarningKeyRepositoryGetter,
    );
    this.registerInclusionResolver(
      'warningKey',
      this.warningKey.inclusionResolver,
    );
  }
}
