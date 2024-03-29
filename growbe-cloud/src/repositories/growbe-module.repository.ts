import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  BelongsToAccessor,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {
  GrowbeModule,
  GrowbeModuleRelations,
  GrowbeSensorValue,
  GrowbeMainboard,
  GrowbeModuleDef,
  GrowbeLogs,
} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GrowbeSensorValueRepository} from './growbe-sensor-value.repository';
import {GrowbeMainboardRepository} from './growbe-mainboard.repository';
import {GrowbeModuleDefRepository} from './growbe-module-def.repository';
import {GrowbeLogsRepository} from './growbe-logs.repository';
import { PgsqlDataSource } from '@berlingoqc/sso/dist/datasources';

export class GrowbeModuleRepository extends DefaultCrudRepository<
  GrowbeModule,
  typeof GrowbeModule.prototype.id,
  GrowbeModuleRelations
> {
  public readonly growbeSensorValues: HasManyRepositoryFactory<
    GrowbeSensorValue,
    typeof GrowbeModule.prototype.id
  >;

  public readonly mainboard: BelongsToAccessor<
    GrowbeMainboard,
    typeof GrowbeModule.prototype.id
  >;

  public readonly moduleDef: HasOneRepositoryFactory<
    GrowbeModuleDef,
    typeof GrowbeModule.prototype.id
  >;

  public readonly growbeLogs: HasManyRepositoryFactory<
    GrowbeLogs,
    typeof GrowbeModule.prototype.id
  >;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @repository.getter('GrowbeSensorValueRepository')
    protected growbeSensorValueRepositoryGetter: Getter<GrowbeSensorValueRepository>,
    @repository.getter('GrowbeMainboardRepository')
    protected growbeMainboardRepositoryGetter: Getter<GrowbeMainboardRepository>,
    @repository.getter('GrowbeModuleDefRepository')
    protected growbeModuleDefRepositoryGetter: Getter<GrowbeModuleDefRepository>,
    @repository.getter('GrowbeLogsRepository')
    protected growbeLogsRepositoryGetter: Getter<GrowbeLogsRepository>,
  ) {
    super(GrowbeModule, dataSource);
    this.growbeLogs = this.createHasManyRepositoryFactoryFor(
      'growbeLogs',
      growbeLogsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeLogs',
      this.growbeLogs.inclusionResolver,
    );
    this.moduleDef = this.createHasOneRepositoryFactoryFor(
      'moduleDef',
      growbeModuleDefRepositoryGetter,
    );
    this.registerInclusionResolver(
      'moduleDef',
      this.moduleDef.inclusionResolver,
    );
    this.mainboard = this.createBelongsToAccessorFor(
      'mainboard',
      growbeMainboardRepositoryGetter,
    );
    this.registerInclusionResolver(
      'mainboard',
      this.mainboard.inclusionResolver,
    )
    this.growbeSensorValues = this.createHasManyRepositoryFactoryFor(
      'growbeSensorValues',
      growbeSensorValueRepositoryGetter,
    );
    this.registerInclusionResolver(
      'growbeSensorValues',
      this.growbeSensorValues.inclusionResolver,
    );
  }
}
