import { expect } from "@loopback/testlab";
import {authorize, AuthorizationDecision, AuthorizationContext, AuthorizationMetadata} from '@loopback/authorization';
import { GrowbeCloudApplication } from "../../application";
import { getVoterMainboardUserOrOrganisation } from "../../cloud/authorization";
import { setupApplication } from "../fixtures/app";
import { boardId, orgId, userId } from "../fixtures/data";
import { GrowbeMainboardRepository } from "../../repositories";
import { sleep } from "@berlingoqc/sso";





describe.only('authorization growbe', () => {

    let app: GrowbeCloudApplication;

    let mainboardRepo: GrowbeMainboardRepository;

    const getAuthorizationContext = (args: any[], organisations: any[], roles: any[]) => {
        const ctx = {
            principals: [
                {
                    id: userId,
                    organisations,
                    roles,
                }
            ],
            invocationContext: {
                get: (name: string) => app.get(name),
                args,
            }
        } as any; 
        const metadata = {
            
        } as any;
    
        return { ctx, metadata }
    }

    const testCaseAuthorization = async (data: {
        growbeIdIndex?: number,
        orgIdIndex?: number,
        managerOnly?: boolean,
        orgRoles?: string[],

        args?: any[],
        orgs?: any[],
        roles?: any[],

        userId?: string,
        orgId?: string,
    }
    ) => {
        await mainboardRepo.create({
            id: boardId,
            userId: data.userId,
            organisationId: data.orgId,
        })
        const voter = getVoterMainboardUserOrOrganisation(data.growbeIdIndex, data.orgIdIndex, data.managerOnly, data.orgRoles);
        const { ctx, metadata } = getAuthorizationContext(data.args ?? [], data.orgs ?? [] , data.roles ?? []);
        return await voter(ctx, metadata);
    }

    before('setupApplication', async function () {
      ({app} = await setupApplication(
        null,
        async (portailApp: GrowbeCloudApplication) => {},
      ));
      mainboardRepo = await app.getRepository(GrowbeMainboardRepository);
      await mainboardRepo.deleteAll();
    });
  
    after(async () => {
      await app.stop();
    });

    afterEach(async () => {
        await mainboardRepo.deleteAll();
    });

    describe('user ownership', () => {
        it('user access growbe that he owned, allow', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId,
                args: [boardId],
            });

            expect(result).to.eql(AuthorizationDecision.ALLOW);
        });

        it('user access growbe that he dont owned, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: 'not_my_user_id',
                args: [boardId],
            });

            expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user try to access mp that is not owned, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            expect(result).to.eql(AuthorizationDecision.DENY);
        });
    })

    describe('organisation ownership', () => {

        it('user wanted growbes of is organisation, allowed', async () => {
            const result = await testCaseAuthorization({
                orgIdIndex: 0,
                userId: undefined,
                orgId: orgId,
                args: [orgId],
                orgs: [{id: orgId}],
            });

            expect(result).to.eql(AuthorizationDecision.ALLOW);
        });

        it('user wanted growbes of not is organisation, denied', async () => {
            const result = await testCaseAuthorization({
                orgIdIndex: 0,
                args: [orgId],
                orgs: [],
            });

            expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user access growbe owned by a organisation is in, allow', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            //expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user access growbe owned by a organisation is not in, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            //expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user is manager of organisation and endpoint only for manager only, allowed', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            //expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user is not manager of organisation and endpoint only for manager only, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            //expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user have role inside organisation that is required, allow',async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            //expect(result).to.eql(AuthorizationDecision.DENY);
        });

        it('user dont have role inside organisation thas is required, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            //expect(result).to.eql(AuthorizationDecision.DENY);
        });
    });
});