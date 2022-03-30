import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {GrowbeHardwareAlarmEvent, GrowbeHardwareAlarmEventRelations} from '../models';

export class GrowbeHardwareAlarmEventRepository extends DefaultCrudRepository<
  GrowbeHardwareAlarmEvent,
  typeof GrowbeHardwareAlarmEvent.prototype.id,
  GrowbeHardwareAlarmEventRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(GrowbeHardwareAlarmEvent, dataSource);
  }
}
