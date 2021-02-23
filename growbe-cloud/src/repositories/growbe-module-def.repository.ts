import {DefaultCrudRepository} from '@loopback/repository';
import {GrowbeModuleDef, GrowbeModuleDefRelations} from '../models';
import {PgsqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GrowbeModuleDefRepository extends DefaultCrudRepository<
  GrowbeModuleDef,
  typeof GrowbeModuleDef.prototype.id,
  GrowbeModuleDefRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(GrowbeModuleDef, dataSource);
  }
}
