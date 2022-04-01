import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {GrowbeHardwareAlarm, GrowbeHardwareAlarmRelations, GrowbeModule} from '../models';
import {GrowbeModuleRepository} from './growbe-module.repository';

export class GrowbeHardwareAlarmRepository extends DefaultCrudRepository<
  GrowbeHardwareAlarm,
  typeof GrowbeHardwareAlarm.prototype.id,
  GrowbeHardwareAlarmRelations
> {

  public readonly module: BelongsToAccessor<GrowbeModule, typeof GrowbeHardwareAlarm.prototype.id>;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource, @repository.getter('GrowbeModuleRepository') protected growbeModuleRepositoryGetter: Getter<GrowbeModuleRepository>,
  ) {
    super(GrowbeHardwareAlarm, dataSource);
    this.module = this.createBelongsToAccessorFor('module', growbeModuleRepositoryGetter,);
    this.registerInclusionResolver('module', this.module.inclusionResolver);
  }
}
