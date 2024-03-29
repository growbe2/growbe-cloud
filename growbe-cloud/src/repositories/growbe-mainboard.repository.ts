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
  GrowbeLogs, GrowbeModuleDef, VirtualRelay, EnvironmentControllerState, GrowbeMainboardConnectionInformation} from '../models';
import {PgsqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {UserRepository} from '@berlingoqc/sso/dist/repositories';
import {User} from '@berlingoqc/sso/dist/models/user.model';
import {GrowbeMainboardConfigRepository} from './growbe-mainboard-config.repository';
import {GrowbeWarningRepository} from './growbe-warning.repository';
import {GrowbeSensorValueRepository} from './growbe-sensor-value.repository';
import {GrowbeModuleRepository} from './growbe-module.repository';
import {GrowbeLogsRepository} from './growbe-logs.repository';
import {GrowbeModuleDefRepository} from './growbe-module-def.repository';
import {VirtualRelayRepository} from './virtual-relay.repository';
import { DeviceLogs, DeviceLogsRepository } from '../component/device-logs';
import {EnvironmentControllerStateRepository} from './environment-controller-state.repository';
import {GrowbeMainboardConnectionInformationRepository} from './growbe-mainboard-connection-information.repository';

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

  public readonly deviceLogs: HasManyRepositoryFactory<
    DeviceLogs,
    typeof GrowbeMainboard.prototype.id
  >;

  public readonly growbeModuleDefs: HasManyRepositoryFactory<GrowbeModuleDef, typeof GrowbeMainboard.prototype.id>;

  public readonly virtualRelays: HasManyRepositoryFactory<VirtualRelay, typeof GrowbeMainboard.prototype.id>;

  public readonly environmentControllerStates: HasManyRepositoryFactory<EnvironmentControllerState, typeof GrowbeMainboard.prototype.id>;

  public readonly connectionInformation: HasOneRepositoryFactory<GrowbeMainboardConnectionInformation, typeof GrowbeMainboard.prototype.id>;

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
    @repository.getter('GrowbeModuleDefRepository')
    protected growbeModuleDefRepositoryGetter: Getter<GrowbeModuleDefRepository>,
    @repository.getter('VirtualRelayRepository')
    protected virtualRelayRepositoryGetter: Getter<VirtualRelayRepository>,
    @repository.getter('DeviceLogsRepository')
    protected deviceLogsRepositoryGetter: Getter<DeviceLogsRepository>, @repository.getter('EnvironmentControllerStateRepository') protected environmentControllerStateRepositoryGetter: Getter<EnvironmentControllerStateRepository>, @repository.getter('GrowbeMainboardConnectionInformationRepository') protected growbeMainboardConnectionInformationRepositoryGetter: Getter<GrowbeMainboardConnectionInformationRepository>,
  ) {
    super(GrowbeMainboard, dataSource);
    this.connectionInformation = this.createHasOneRepositoryFactoryFor('connectionInformation', growbeMainboardConnectionInformationRepositoryGetter);
    this.registerInclusionResolver('connectionInformation', this.connectionInformation.inclusionResolver);
    this.environmentControllerStates = this.createHasManyRepositoryFactoryFor('environmentControllerStates', environmentControllerStateRepositoryGetter,);
    this.registerInclusionResolver('environmentControllerStates', this.environmentControllerStates.inclusionResolver);
    this.virtualRelays = this.createHasManyRepositoryFactoryFor('virtualRelays', virtualRelayRepositoryGetter,);
    this.registerInclusionResolver('virtualRelays', this.virtualRelays.inclusionResolver);
    this.growbeModuleDefs = this.createHasManyRepositoryFactoryFor('growbeModuleDefs', growbeModuleDefRepositoryGetter,);
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
    this.deviceLogs = this.createHasManyRepositoryFactoryFor(
      'deviceLogs',
      deviceLogsRepositoryGetter,
    );
    this.registerInclusionResolver('deviceLogs', this.deviceLogs.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
