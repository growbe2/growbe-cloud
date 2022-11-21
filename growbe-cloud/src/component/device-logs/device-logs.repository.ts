import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../../datasources';
import {DeviceLogs, DeviceLogsRelations} from './device-logs.model';

export class DeviceLogsRepository extends DefaultCrudRepository<
  DeviceLogs,
  typeof DeviceLogs.prototype.id,
  DeviceLogsRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(DeviceLogs, dataSource);
  }
}
