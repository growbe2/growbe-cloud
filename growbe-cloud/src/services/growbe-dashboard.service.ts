import { Filter, repository } from "@loopback/repository";
import { UserProfile } from "@loopback/security";
import { GrowbeDashboard } from "../models";
import { GrowbeDashboardRepository } from "../repositories";


export class GrowbeDashboardService {


    constructor(
        @repository(GrowbeDashboardRepository)
        private dashboardRepo: GrowbeDashboardRepository,
    ) {

    }


    getDashboardForUser(user: UserProfile, f: Filter<GrowbeDashboard> = {}): Promise<GrowbeDashboard[]> {
        const filter: Filter<GrowbeDashboard> = {
            // something better to dont allow to override where or to combine it
            ...f,
            where: {
                or: [
                    {
                        userId: null,
                    },
                    {
                        userId: user.id
                    },
                    {
                        organisationId: {
                            inq: user.organisations?.map((o: any) => o?.id),
                        }
                    }
                ]
            },
        };
        return this.dashboardRepo.find(filter);
    }
}