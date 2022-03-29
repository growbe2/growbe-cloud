import { inject, service } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { get, getFilterSchemaFor, param } from "@loopback/rest";
import { SecurityBindings, UserProfile } from "@loopback/security";
import { GrowbeDashboard } from "../../models";
import { GrowbeDashboardService } from "../../services/growbe-dashboard.service";
import {authenticate} from '@loopback/authentication';




export class GrowbeDashboardController {

    constructor(
        @service(GrowbeDashboardService)
        private dashboardService: GrowbeDashboardService,
    ) {}


    @get('/dashboards')
    @authenticate('jwt')
    findGrowbeOrganisation(
        @inject(SecurityBindings.USER) user: UserProfile,
        @param.query.object('filter', getFilterSchemaFor(GrowbeDashboard))
        filter?: Filter<GrowbeDashboard>,
    ) {
     return this.dashboardService.getDashboardForUser(user, filter);
    }

}