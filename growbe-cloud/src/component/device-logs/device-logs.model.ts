import { Entity, model, property } from "@loopback/repository";

@model({settings: {strict: false}})
export class DeviceLogs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string;

  @property()
  timestamp: Date;

  @property()
  mainboardId: string;

  @property()
  service: string;

  [prop: string]: any;
}

export interface DeviceLogsRelations {
  // describe navigational properties here
}

export type DeviceLogsWithRelations = DeviceLogs & DeviceLogsRelations;
