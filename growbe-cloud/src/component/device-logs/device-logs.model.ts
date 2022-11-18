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
  mainboardId: string;

  [prop: string]: any;
}