import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import { GrowbeVirtualDevice } from './virtual-device.model';

export class GrowbeVirtualDeviceRepository extends DefaultCrudRepository<
  GrowbeVirtualDevice,
  typeof GrowbeVirtualDevice.prototype.id,
  {}
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(GrowbeVirtualDevice, dataSource);
  }
}
