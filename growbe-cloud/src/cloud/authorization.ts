import {chain} from '@berlingoqc/lb-extensions';
import {OrganisationRepository, UserWithRelations} from '@berlingoqc/sso';
import {authenticate} from '@loopback/authentication';
import {authorize, AuthorizationDecision, AuthorizationContext, AuthorizationMetadata} from '@loopback/authorization';
import {Provider} from '@loopback/context';
import {GrowbeMainboard, GrowbeMainboardWithRelations} from '../models';
import {GrowbeMainboardRepository, GrowbeModuleDefRepository, GrowbeModuleRepository} from '../repositories';

type GetMainboard = (ctx: AuthorizationContext, id: string, args: any) => Promise<GrowbeMainboardWithRelations | null>;

async function getMainboard(ctx: AuthorizationContext, id: string, args: any) {
  const mainboardRepo = (await ctx.invocationContext.get(`repositories.${GrowbeMainboardRepository.name}`)) as GrowbeMainboardRepository;
  return mainboardRepo.findOne({
    where: args,
  });
}

export async function getMainboardByModule(ctx: AuthorizationContext, id: string, args: any) {
  const moduleRepo = (await ctx.invocationContext.get(`repositories.${GrowbeModuleRepository.name}`)) as GrowbeModuleRepository;
  delete args.id;
  return moduleRepo
    .findOne({
      where: {
        id: id,
      },
      include: [
        {
          relation: 'mainboard',
          scope: {
            where: args,
          }
        },
      ],
    })
    .then(i => i?.mainboard as GrowbeMainboardWithRelations);
}

export async function getMainboardByModuleDef(ctx: AuthorizationContext, id: string, args: any) {
  const moduleDefRepo = (await ctx.invocationContext.get(`repositories.${GrowbeModuleDefRepository.name}`)) as GrowbeModuleDefRepository;
  delete args.id;
  return moduleDefRepo
    .findOne({
      where: {
        moduleId: id,
      },
      include: [
        {
          relation: 'mainboard',
          scope: {
            where: args,
          }
        },
      ],
    })
    .then(i => i?.mainboard as GrowbeMainboardWithRelations);
}


export const getVoterRole = (roles: string[]) => {
  return async (ctx: AuthorizationContext, metadata: AuthorizationMetadata) => {
    const user = ctx.principals[0] as any as UserWithRelations;
    return ((user.roles as any as string[]).some(r => roles.findIndex(rr => rr == r) > -1)) ? AuthorizationDecision.ALLOW : AuthorizationDecision.ABSTAIN;
  }
}

/**
 *
 * @param growbeIdIndex if growbeId valid that the user possess the growbeId
 * @param orgIdIndex if orgId valid valid that the user belongs to this organisation
 * add if growbeId is also set valid that the growbe is possess by the organisation.
 * @param managerOnly allow the manager of the org only to access the ressource,
 * orgIdIndex must be set.
 * @param orgRoles if orgId is set valid that the user have the role inside the organisation
 * to access this ressource.
 * @returns
 */
export const getVoterMainboardUserOrOrganisation =
  (growbeIdIndex?: number, orgIdIndex?: number, managerOnly?: boolean, orgRoles?: string[], userIdIndex?: number, getFunc: GetMainboard = getMainboard) =>
  async (ctx: AuthorizationContext, metadata: AuthorizationMetadata) => {
    const user = ctx.principals[0] as any as UserWithRelations;

    const growbeId = growbeIdIndex !== undefined ? ctx.invocationContext.args[growbeIdIndex] : undefined;
    const orgId = orgIdIndex !== undefined ? ctx.invocationContext.args[orgIdIndex] : undefined;

    const userId = userIdIndex !== undefined ? ctx.invocationContext.args[userIdIndex] : userIdIndex;

    if (userId && userId === user.id) {
      return AuthorizationDecision.ALLOW;
    }

    if (orgId) {
      if (managerOnly) {
        const orgRepo = (await ctx.invocationContext.get(`repositories.${OrganisationRepository.name}`)) as OrganisationRepository;
        const org = await orgRepo.findById(orgId);
        if (org.managerId === user.id) {
          return AuthorizationDecision.ALLOW;
        }
        return AuthorizationDecision.ABSTAIN;
      } else {
        if (!growbeIdIndex) {
          // valide que je suis dans l'organisation
          const indexOrg = user?.organisations ? user.organisations.findIndex(org => org.id === orgId) : -1;
          if (indexOrg > -1) {
            return AuthorizationDecision.ALLOW;
          } else {
            return AuthorizationDecision.ABSTAIN;
          }
        } else {
          // valid que le growbe est posséder par l'org
          const mainboard = await getFunc(ctx, growbeId, {id: growbeId, organisationId: orgId});

          if (mainboard) {
            return AuthorizationDecision.ALLOW;
          } else {
            return AuthorizationDecision.ABSTAIN;
          }
        }
      }
    } else {
      if (growbeId) {
        const mainboard = await getFunc(ctx, growbeId, { id: growbeId, or: [{userId: user.id},{organisationId: { inq: user.organisations?.map(o => o.id)}}]});
        if (mainboard) {
          return AuthorizationDecision.ALLOW;
        } else {
          return AuthorizationDecision.ABSTAIN;
        }
      }
    }

    return AuthorizationDecision.ABSTAIN;
  };

export function authorizeGrowbe({
  growbeIdIndex,
  orgIdIndex,
  managerOnly,
  orgRoles,
  userIdIndex,
  getFunc,
}: {
  growbeIdIndex?: number;
  orgIdIndex?: number;
  managerOnly?: boolean;
  orgRoles?: string[];
  userIdIndex?: number;
  getFunc?: GetMainboard;
}) {
  return chain(
    {
      func: authenticate,
      args: ['jwt'],
    },
    {
      func: authorize,
      args: [
        {
          voters: [
            getVoterRole(['ADMIN']),
            getVoterMainboardUserOrOrganisation(growbeIdIndex, orgIdIndex, managerOnly, orgRoles, userIdIndex, getFunc)
          ],
        },
      ],
    },
  );
}
