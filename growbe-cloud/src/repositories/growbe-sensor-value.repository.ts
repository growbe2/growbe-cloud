import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  GrowbeSensorValue,
  GrowbeSensorValueRelations,
  GrowbeMainboard,
} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrowbeMainboardRepository} from './growbe-mainboard.repository';

export class GrowbeSensorValueRepository extends DefaultCrudRepository<
  GrowbeSensorValue,
  typeof GrowbeSensorValue.prototype.id,
  GrowbeSensorValueRelations
> {
  public readonly growbeMainboard: BelongsToAccessor<
    GrowbeMainboard,
    typeof GrowbeSensorValue.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('GrowbeMainboardRepository')
    protected growbeMainboardRepositoryGetter: Getter<GrowbeMainboardRepository>,
  ) {
    super(GrowbeSensorValue, dataSource);
    this.growbeMainboard = this.createBelongsToAccessorFor(
      'growbeMainboard',
      growbeMainboardRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeMainboard',
      this.growbeMainboard.inclusionResolver,
    );
  }
}
