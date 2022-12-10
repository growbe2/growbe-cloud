import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {EnvironmentControllerState, EnvironmentControllerStateRelations} from '../models';

export class EnvironmentControllerStateRepository extends DefaultCrudRepository<
  EnvironmentControllerState,
  typeof EnvironmentControllerState.prototype.id,
  EnvironmentControllerStateRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(EnvironmentControllerState, dataSource);
  }
}
