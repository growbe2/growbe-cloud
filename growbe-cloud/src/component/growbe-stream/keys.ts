import {BindingKey} from '@loopback/core';

export namespace NMSBindings {
  export const NMS_KEY = BindingKey.create<string>('nms.key');
  export const NMS_PASSWORD = BindingKey.create<string>('nms.password');
  export const NMS_USERNAME = BindingKey.create<string>('nms.username');
  export const NMS_URL = BindingKey.create<string>('nms.url');
}
