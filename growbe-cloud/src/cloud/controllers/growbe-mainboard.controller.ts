// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { get, param, patch, post, requestBody } from "@loopback/openapi-v3";
import { GrowbeRegisterRequest, GrowbeService } from "../../services";
import {authenticate} from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from "@loopback/security";

// import {inject} from '@loopback/core';


export class GrowbeMainboardController {
  constructor(@service(GrowbeService) private growbeService: GrowbeService) {}

  @post('/growbe/register')
  @authenticate('jwt')
  registerGrowbe(
    @inject(SecurityBindings.USER) user: UserProfile,
    @requestBody() request: GrowbeRegisterRequest
  ) {
    return this.growbeService.register(user.id, request);
  }

  @patch('/growbe/{id}/config')
  @authenticate('jwt')
  setGrowbeTime(
    @param.path.string('id') id: string,
    @requestBody() body: any,
  ) {
    return this.growbeService.updateConfig(id, body)
  } 

}
