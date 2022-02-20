import { Filter, repository } from "@loopback/repository";
import { GrowbeDashboard } from "../models";
import { GrowbeDashboardRepository } from "../repositories";


export class GrowbeDashboardService {


    constructor(
        @repository(GrowbeDashboardRepository)
        private dashboardRepo: GrowbeDashboardRepository,
    ) {

    }


    getDashboardForUser(userId: string, f: Filter<GrowbeDashboard> = {}): Promise<GrowbeDashboard[]> {
        const filter: Filter<GrowbeDashboard> = {
            // something better to dont allow to override where or to combine it
            ...f,
            where: {
                or: [
                    {
                        userId: null,
                    },
                    {
                        userId
                    }
                ]
            },
        };
        return this.dashboardRepo.find(filter);
    }
}