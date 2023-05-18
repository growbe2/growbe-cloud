import { expect } from "@loopback/testlab";
import {authorize, AuthorizationDecision, AuthorizationContext, AuthorizationMetadata} from '@loopback/authorization';
import { GrowbeCloudApplication } from "../../application";
import { cache, getVoterMainboardUserOrOrganisation } from "../../cloud/authorization";
import { setupApplication } from "../fixtures/app";
import { boardId, orgId, userId } from "../fixtures/data";
import { GrowbeMainboardRepository } from "../../repositories";
import { OrganisationRepository } from "@berlingoqc/sso/src/repositories/organisation.repository";

describe('authorization growbe', () => {

    let app: GrowbeCloudApplication;

    let mainboardRepo: GrowbeMainboardRepository;
    let orgRepo: OrganisationRepository;

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
      orgRepo = await app.getRepository(OrganisationRepository);
      await mainboardRepo.deleteAll();
    });
  
    after(async () => {
      await app.stop();
    });

    afterEach(async () => {
        await mainboardRepo.deleteAll();
        await orgRepo.deleteAll();
        cache.flush();
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

            expect(result).to.eql(AuthorizationDecision.ABSTAIN);
        });

        it('user try to access mp that is not owned, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId: undefined,
                args: [boardId],
            });

            expect(result).to.eql(AuthorizationDecision.ABSTAIN);
        });
    })

    describe('organisation ownership', () => {


        it('user wanted growne owned by organisation that is in, allow', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                orgId: orgId,
                args: [boardId],
                orgs: [{id: orgId}],
            });

            expect(result).to.eql(AuthorizationDecision.ALLOW);
        });

        it('user wanted growne owned by organisation that is in, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                orgId: 'not-my-org-id',
                args: [boardId],
                orgs: [{id: orgId}],
            });

            expect(result).to.eql(AuthorizationDecision.ABSTAIN);
        });

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

            expect(result).to.eql(AuthorizationDecision.ABSTAIN);
        });

        it('user access growbe owned by a organisation is in, allow', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                orgIdIndex: 1,
                userId: undefined,
                orgId: orgId,
                args: [boardId, orgId],
                orgs: [{id: orgId}]
            });

            expect(result).to.eql(AuthorizationDecision.ALLOW);
        });

        it('user access growbe owned by a organisation is not in, denied', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                orgIdIndex: 1,
                orgId: orgId,
                userId: undefined,
                args: [boardId],
                orgs: [],
            });

            expect(result).to.eql(AuthorizationDecision.ABSTAIN);
        });

        it('user is manager of organisation and endpoint only for manager only, allowed', async () => {
            await orgRepo.create({
                id: orgId,
                managerId: userId,
            });

            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                orgIdIndex: 1,
                userId: undefined,
                managerOnly: true,
                args: [boardId, orgId],
            });

            expect(result).to.eql(AuthorizationDecision.ALLOW);
        });

        it('user is not manager of organisation and endpoint only for manager only, denied', async () => {
            orgRepo.create({
                id: orgId,
                managerId: 'not-my-id',
            });

            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                orgIdIndex: 1,
                userId: undefined,
                managerOnly: true,
                args: [boardId, orgId],
            });

            expect(result).to.eql(AuthorizationDecision.ABSTAIN);
        });

        /*it('user have role inside organisation that is required, allow',async () => {
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
        });*/
    });


    describe('caching' , () => {

        it('call twice use result store in cache', async () => {
            const result = await testCaseAuthorization({
                growbeIdIndex: 0,
                userId,
                args: [boardId],
            });

            expect(result).to.eql(AuthorizationDecision.ALLOW);
        });

    });
});