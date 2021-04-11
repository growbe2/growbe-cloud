import {BindingKey} from '@loopback/core';

export namespace NMSBindings {
  export const NMS_KEY = BindingKey.create<string>('nms.key');
}
