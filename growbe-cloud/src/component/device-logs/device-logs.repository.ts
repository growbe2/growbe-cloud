import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../../datasources';
import {DeviceLogs} from './device-logs.model';

export class DeviceLogsRepository extends DefaultCrudRepository<
  DeviceLogs,
  typeof DeviceLogs.prototype.id,
  {}
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(DeviceLogs, dataSource);
  }
}
