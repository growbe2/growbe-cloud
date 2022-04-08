import { service } from "@loopback/core";
import { get, param, post, requestBody } from "@loopback/rest";
import { GrowbeMainboardVersionService } from "../../services/growbe-mainboard-version.service";
import {authenticate} from '@loopback/authentication';
import {authorize, AuthorizationDecision, AuthorizationContext, AuthorizationMetadata} from '@loopback/authorization';
import {getVoterRole} from "../authorization";

export class GrowbeMainboardVersionController {
    constructor(
      @service(GrowbeMainboardVersionService)
      private versionService: GrowbeMainboardVersionService,
    ) {}
  
    @get('/growbe-mainboard/version')
    findVersion(
        @param.query.string('channel') channel: string,
    ) {
      return this.versionService.foundLatest(channel);
    }

    @post('/growbe-mainboard/version')
    @authenticate('jwt')
    @authorize({voters: [getVoterRole(['ADMIN'])]})
    releaseVersionMainboard(
        @requestBody() body: any
    ) {
        return this.versionService.releaseNewVersion(body.name)
    }
}
