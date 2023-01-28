import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {GrowbeMainboardConnectionInformation, GrowbeMainboardConnectionInformationRelations} from '../models';

export class GrowbeMainboardConnectionInformationRepository extends DefaultCrudRepository<
  GrowbeMainboardConnectionInformation,
  typeof GrowbeMainboardConnectionInformation.prototype.id,
  GrowbeMainboardConnectionInformationRelations
> {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
  ) {
    super(GrowbeMainboardConnectionInformation, dataSource);
  }
}
