import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {
  GrowbeMainboard,
  GrowbeMainboardRelations,
  GrowbeMainboardConfig,
  GrowbeWarning,
  GrowbeSensorValue,
  GrowbeModule,
  GrowbeLogs,
} from '../models';
import {PgsqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {UserRepository, User} from '@berlingoqc/sso';
import {GrowbeMainboardConfigRepository} from './growbe-mainboard-config.repository';
import {GrowbeWarningRepository} from './growbe-warning.repository';
import {GrowbeSensorValueRepository} from './growbe-sensor-value.repository';
import {GrowbeModuleRepository} from './growbe-module.repository';
import {GrowbeLogsRepository} from './growbe-logs.repository';

export class GrowbeMainboardRepository extends DefaultCrudRepository<
  GrowbeMainboard,
  typeof GrowbeMainboard.prototype.id,
  GrowbeMainboardRelations
> {
  user: BelongsToAccessor<User, typeof GrowbeMainboard.prototype.id>;

  public readonly growbeMainboardConfig: HasOneRepositoryFactory<
    GrowbeMainboardConfig,
    typeof GrowbeMainboard.prototype.id
  >;

  public readonly growbeWarnings: HasManyRepositoryFactory<
    GrowbeWarning,
    typeof GrowbeMainboard.prototype.id
  >;

  public readonly growbeSensorValues: HasManyRepositoryFactory<
    GrowbeSensorValue,
    typeof GrowbeMainboard.prototype.id
  >;

  public readonly growbeModules: HasManyRepositoryFactory<
    GrowbeModule,
    typeof GrowbeMainboard.prototype.id
  >;

  public readonly growbeLogs: HasManyRepositoryFactory<
    GrowbeLogs,
    typeof GrowbeMainboard.prototype.id
  >;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @repository.getter('repositories.UserRepository')
    userGetter: Getter<UserRepository>,
    @repository.getter('GrowbeMainboardConfigRepository')
    protected growbeMainboardConfigRepositoryGetter: Getter<GrowbeMainboardConfigRepository>,
    @repository.getter('GrowbeWarningRepository')
    protected growbeWarningRepositoryGetter: Getter<GrowbeWarningRepository>,
    @repository.getter('GrowbeSensorValueRepository')
    protected growbeSensorValueRepositoryGetter: Getter<GrowbeSensorValueRepository>,
    @repository.getter('GrowbeModuleRepository')
    protected growbeModuleRepositoryGetter: Getter<GrowbeModuleRepository>,
    @repository.getter('GrowbeLogsRepository')
    protected growbeLogsRepositoryGetter: Getter<GrowbeLogsRepository>,
  ) {
    super(GrowbeMainboard, dataSource);
    this.growbeLogs = this.createHasManyRepositoryFactoryFor(
      'growbeLogs',
      growbeLogsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeLogs',
      this.growbeLogs.inclusionResolver,
    );
    this.growbeModules = this.createHasManyRepositoryFactoryFor(
      'growbeModules',
      growbeModuleRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeModules',
      this.growbeModules.inclusionResolver,
    );
    this.growbeSensorValues = this.createHasManyRepositoryFactoryFor(
      'growbeSensorValues',
      growbeSensorValueRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeSensorValues',
      this.growbeSensorValues.inclusionResolver,
    );
    this.growbeWarnings = this.createHasManyRepositoryFactoryFor(
      'growbeWarnings',
      growbeWarningRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeWarnings',
      this.growbeWarnings.inclusionResolver,
    );
    this.growbeMainboardConfig = this.createHasOneRepositoryFactoryFor(
      'growbeMainboardConfig',
      growbeMainboardConfigRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeMainboardConfig',
      this.growbeMainboardConfig.inclusionResolver,
    );
    this.user = this.createBelongsToAccessorFor('user', userGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
