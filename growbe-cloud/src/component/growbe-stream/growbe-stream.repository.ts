import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../../datasources';
import {GrowbeStream, GrowbeStreamRelations} from './growbe-stream.model';

export class GrowbeStreamRepository extends DefaultCrudRepository<
  GrowbeStream,
  typeof GrowbeStream.prototype.id,
  GrowbeStreamRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(GrowbeStream, dataSource);
  }
}
