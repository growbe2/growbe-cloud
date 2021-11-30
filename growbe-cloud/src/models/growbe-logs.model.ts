import {Entity, model, property} from '@loopback/repository';

export enum GroupEnum {
  MAINBOARD = 'mainboard',
  MODULES = 'modules',
}

export enum LogTypeEnum {
  MODULE_STATE_CHANGE = 'module',
  MODULE_CONFIG_CHANGE = 'module_config',
  CONNECTION_STATE_CHANGE = 'connection',
  LOCAL_CONNECTION_UPDATED = 'local_connection',
  WARNING_CREATED = 'new_warning',
  RTC_UPDATE = 'update_rtc',
  SYNC_REQUEST = 'sync_request',
  GROWBE_CONFIG_CHANGE = 'growbe_config',
  ALARM = 'alarm',
}

export const LogTypEnumArray = [LogTypeEnum.MODULE_STATE_CHANGE, LogTypeEnum.MODULE_CONFIG_CHANGE,LogTypeEnum.CONNECTION_STATE_CHANGE,
LogTypeEnum.WARNING_CREATED, LogTypeEnum.RTC_UPDATE, LogTypeEnum.SYNC_REQUEST, LogTypeEnum.GROWBE_CONFIG_CHANGE, LogTypeEnum.ALARM];

export enum SeverityEnum {
  LOW = '0',
  MEDIUM = '1',
  HIGH = '2',
}

@model({settings: {strict: false}})
export class GrowbeLogs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  timestamp: Date;

  @property({type: 'string', jsonSchema: {enum: Object.values(SeverityEnum)}})
  severity: SeverityEnum;

  @property({type: 'string', jsonSchema: {enum: Object.values(GroupEnum)}})
  group: GroupEnum;

  @property({type: 'string', jsonSchema: {enum: Object.values(LogTypeEnum)}})
  type: LogTypeEnum;

  @property()
  message: string;

  @property()
  newState?: any;

  @property()
  oldState?: any;

  @property({
    type: 'string',
  })
  growbeMainboardId: string;

  @property({
    type: 'string',
  })
  growbeModuleId?: string;
  [prop: string]: any;

  constructor(data?: Partial<GrowbeLogs>) {
    super(data);
  }
}

export interface GrowbeLogsRelations {
  // describe navigational properties here
}

export type GrowbeLogsWithRelations = GrowbeLogs & GrowbeLogsRelations;
