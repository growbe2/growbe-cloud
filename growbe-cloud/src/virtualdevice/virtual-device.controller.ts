import { del, param, post, requestBody } from "@loopback/openapi-v3";
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization'
import { GrowbeVirtualDevice } from "./virtual-device.model";
import { GrowbeVirtualDeviceService } from "./virtual-device.service";
import { service } from "@loopback/core";

export class GrowbeVirtualDeviceController {
  constructor(
	  @service(GrowbeVirtualDeviceService)
	  private virtualDeviceService: GrowbeVirtualDeviceService
  ) {}

  @post('/virtualDevice')
  @authenticate('jwt')
  @authorize({
	  allowedRoles: ['ADMIN']
  })
  createVirtualDevice(
	  @requestBody() virtualDevice: GrowbeVirtualDevice,
  ) {
	  return this.virtualDeviceService.addVirtualDevice(virtualDevice);
  }

  @del('/virtualDevice/{id}')
  @authenticate('jwt')
  @authorize({
	  allowedRoles: ['ADMIN']
  })
  deleteVirtualDevice(
	  @param.path.string('id') id: string,
  ) {
	  return this.virtualDeviceService.removeVirtualDevice(id);
  }

}
