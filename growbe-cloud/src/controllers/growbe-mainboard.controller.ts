// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { get, param, post, requestBody } from "@loopback/openapi-v3";
import { GrowbeRegisterRequest, GrowbeService } from "../services";
import {authenticate} from '@loopback/authentication';
import { SecurityBindings, securityId, UserProfile } from "@loopback/security";

// import {inject} from '@loopback/core';


export class GrowbeMainboardController {
  constructor(@service(GrowbeService) private growbeService: GrowbeService) {}


  @get('/user/{id}/growbes')
  @authenticate('jwt')
  getUserGrowbe(
    @param.path.string('id') id: string
  )  {
    return this.growbeService.getGrowbeByProfile(id)
  }

  @post('/growbe/register')
  @authenticate('jwt')
  registerGrowbe(
    @inject(SecurityBindings.USER) user: UserProfile,
    @requestBody() request: GrowbeRegisterRequest
  ) {
    return this.growbeService.register(user[securityId], request);
  }
}
