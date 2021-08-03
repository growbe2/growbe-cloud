// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import { Filter, Where } from '@loopback/filter';
import {get, getFilterSchemaFor, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/openapi-v3';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {
  BaseDashboardElement,
  DashboardClockStateElement,
  DashboardGraphElement,
  DashboardLastValueElement,
  GraphDataConfig,
  GrowbeMainboard,
  ModuleDataRequest,
} from '../../models';
import {GrowbeRegisterRequest, GrowbeService} from '../../services';
import {
  GraphModuleRequest,
  ModuleValueGraphService,
} from '../../services/module-value-graph.service';
import {schemaJsonOf} from '../../utility/oa3model';
import { userId } from '../../__tests__/fixtures/data';

// import {inject} from '@loopback/core';

export class GrowbeMainboardController {
  constructor(
    @service(GrowbeService)
    private growbeService: GrowbeService,
    @service(ModuleValueGraphService)
    private graphService: ModuleValueGraphService,
  ) {}


  @get('/growbes/organisations/{id}')
  @authenticate('jwt')
  findGrowbeOrganisation(
    @param.path.string('id') organisationId: string,
    @param.query.object('filter', getFilterSchemaFor(GrowbeMainboard)) filter?: Filter<GrowbeMainboard> 
  ) {
    return this.growbeService.find({organisationId}, filter);
  }

  @get('/growbes/organisations/{id}/count')
  @authenticate('jwt')
  findGrowbeOrganisationCount(
    @param.path.string('id') organisationId: string,
    @param.query.object('where', getWhereSchemaFor(GrowbeMainboard)) where?: Where<GrowbeMainboard> 
  ) {
    return this.growbeService.count({organisationId},where);
  }

  @get('/growbes/user/{id}')
  @authenticate('jwt')
  findGrowbeUser(
    @param.path.string('id') userId: string,
    @param.query.object('filter', getFilterSchemaFor(GrowbeMainboard)) filter?: Filter<GrowbeMainboard> 
  ) {
    return this.growbeService.find({userId}, filter)
  }

  @get('/growbes/user/{id}/count')
  @authenticate('jwt')
  findGrowbeUserCount(
    @param.path.string('id') userId: string,
    @param.query.object('where', getWhereSchemaFor(GrowbeMainboard)) where?: Where<GrowbeMainboard> 
  ) {
    return this.growbeService.count({userId}, where);
  }


  @post('/growbe/register')
  @authenticate('jwt')
  registerGrowbe(
    @inject(SecurityBindings.USER) user: UserProfile,
    @requestBody() request: GrowbeRegisterRequest,
  ) {
    return this.growbeService.register(user.id, request);
  }

  @post('/growbes/{id}/register/org/{orgId}')
  @authenticate('jwt')
  registerOrganisation(
    @inject(SecurityBindings.USER) user: UserProfile,
    @param.path.string('id') growbeId: string,
    @param.path.string('orgId') orgId: string,
  ) {
    return this.growbeService.registerOrganisation(user.id, growbeId, orgId);
  }

  @patch('/growbe/{id}/config')
  @authenticate('jwt')
  async setGrowbeConfig(
    @param.path.string('id') id: string,
    @requestBody() body: any,
  ) {
    const d = await this.growbeService.updateConfig(id, body);
    return d;
  }

  @patch('/growbe/{id}/rtc')
  @authenticate('jwt')
  setGrowbeRTC(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeService.setRTC(id, body);
  }

  @patch('/growbe/{id}/sync')
  @authenticate('jwt')
  setGrowbeSync(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeService.sendSyncRequest(id);
  }

  @get('/model/graphDataConfig', schemaJsonOf(GraphDataConfig))
  graphDataConfig() {
    return new GraphDataConfig();
  }

  @get('/model/dashboardGraphElement', schemaJsonOf(DashboardGraphElement))
  dashboardGraphElement() {
    return new GraphDataConfig();
  }

  @get('/model/baseDashboardElement', schemaJsonOf(BaseDashboardElement))
  baseDashboardElement() {
    return new BaseDashboardElement();
  }

  @get(
    '/model/dashboardLastValueElement',
    schemaJsonOf(DashboardLastValueElement),
  )
  dashboardLastValueElement() {
    return new DashboardLastValueElement();
  }

  @get(
    '/model/dashboardClockStateElement',
    schemaJsonOf(DashboardClockStateElement),
  )
  dashboardClockStateElement() {
    return new DashboardClockStateElement();
  }
}
