// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {Filter, Where} from '@loopback/filter';
import {
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/openapi-v3';
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
import {
  GrowbeRegisterRequest,
  GrowbeRegisterResponse,
  GrowbeService,
} from '../../services';
import {
  GraphModuleRequest,
  ModuleValueGraphService,
} from '../../services/module-value-graph.service';
import {schemaJsonOf} from '../../utility/oa3model';
import { authorizeGrowbe } from '../authorization';

// import {inject} from '@loopback/core';

export class GrowbeMainboardController {
  constructor(
    @service(GrowbeService)
    private growbeService: GrowbeService,
    @service(ModuleValueGraphService)
    private graphService: ModuleValueGraphService,
  ) {}

  @get('/growbes/organisations/{id}')
  @authorizeGrowbe({
    orgIdIndex: 0,
  })
  findGrowbeOrganisation(
    @param.path.string('id') organisationId: string,
    @param.query.object('filter', getFilterSchemaFor(GrowbeMainboard))
    filter?: Filter<GrowbeMainboard>,
  ) {
    return this.growbeService.find({organisationId}, filter);
  }

  @get('/growbes/organisations/{id}/count')
  @authorizeGrowbe({
    orgIdIndex: 0,
  })
  findGrowbeOrganisationCount(
    @param.path.string('id') organisationId: string,
    @param.query.object('where', getWhereSchemaFor(GrowbeMainboard))
    where?: Where<GrowbeMainboard>,
  ) {
    return this.growbeService.count({organisationId}, where);
  }

  @get('/growbes/user/{id}')
  @authorizeGrowbe({
    userIdIndex: 0,
  })
  findGrowbeUser(
    @param.path.string('id') userId: string,
    @param.query.object('filter', getFilterSchemaFor(GrowbeMainboard))
    filter?: Filter<GrowbeMainboard>,
  ) {
    return this.growbeService.find({userId}, filter);
  }

  @get('/growbes/user/{id}/count')
  @authorizeGrowbe({
    userIdIndex: 0,
  })
  findGrowbeUserCount(
    @param.path.string('id') userId: string,
    @param.query.object('where', getWhereSchemaFor(GrowbeMainboard))
    where?: Where<GrowbeMainboard>,
  ) {
    return this.growbeService.count({userId}, where);
  }

  @post('/growbe/register', {
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: getModelSchemaRef(GrowbeRegisterResponse),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  registerGrowbe(
    @inject(SecurityBindings.USER) user: UserProfile,
    @requestBody() request: GrowbeRegisterRequest,
  ) {
    return this.growbeService.register(user.id, request);
  }

  @post('/growbe/{id}/register/org/{orgId}')
  @authorizeGrowbe({
    growbeIdIndex: 0,
    orgIdIndex: 1,
  })
  registerOrganisation(
    @inject(SecurityBindings.USER) user: UserProfile,
    @param.path.string('id') growbeId: string,
    @param.path.string('orgId') orgId: string,
  ) {
    return this.growbeService.registerOrganisation(user.id, growbeId, orgId);
  }

  @patch('/growbe/{id}/config')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  async setGrowbeConfig(
    @param.path.string('id') id: string,
    @requestBody() body: any,
  ) {
    const d = await this.growbeService.updateConfig(id, body);
    return d;
  }

  @patch('/growbe/{id}/rtc')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  setGrowbeRTC(@param.path.string('id') id: string, @requestBody() body: any) {
    return this.growbeService.setRTC(id, body);
  }

  @patch('/growbe/{id}/sync')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
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
