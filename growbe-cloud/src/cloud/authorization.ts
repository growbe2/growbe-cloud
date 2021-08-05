import { OrganisationRepository, UserWithRelations } from '@berlingoqc/sso';
import {authorize, AuthorizationDecision, AuthorizationContext, AuthorizationMetadata} from '@loopback/authorization';
import { Provider } from '@loopback/context';
import { GrowbeMainboardRepository } from '../repositories';

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


export const getVoterMainboardUserOrOrganisation = (
	growbeIdIndex?: number,
	orgIdIndex?: number,
	managerOnly?: boolean,
	orgRoles?: string[],
) => 
	async (ctx: AuthorizationContext, metadata: AuthorizationMetadata) => {
		const user = ctx.principals[0] as any as UserWithRelations;

		const growbeId = (growbeIdIndex !== undefined) ? ctx.invocationContext.args[growbeIdIndex]: undefined;
		const orgId = (orgIdIndex !== undefined) ? ctx.invocationContext.args[orgIdIndex]: undefined;

		const mainboardRepo = (await ctx.invocationContext.get(`repositories.${GrowbeMainboardRepository.name}`)) as GrowbeMainboardRepository;

		if (orgId) {
			if (managerOnly) {
				const orgRepo = (await ctx.invocationContext.get(`repositories.${OrganisationRepository.name}`)) as OrganisationRepository;
				const org = await orgRepo.findById(orgId);
				if (org.managerId === user.id) {
					return AuthorizationDecision.ALLOW
				}
				return AuthorizationDecision.DENY;
			} else {
				if (!growbeIdIndex) {
					// valide que je suis dans l'organisation
					const indexOrg = (user?.organisations) ? user.organisations.findIndex((org) => org.id === orgId) : -1
					if (indexOrg > -1) {
						return AuthorizationDecision.ALLOW;
					} else {
						return AuthorizationDecision.DENY;
					}
				} else {
					// valid que le growbe est posséder par l'org
					const mainboard = await mainboardRepo.findOne({
						where: {
							id: growbeId,
							organisationId: orgId,
						}
					});

					if (mainboard) {
						return AuthorizationDecision.ALLOW;
					} else {
						return AuthorizationDecision.DENY;
					}
				}

			}
		} else {
			if (growbeId) {
				const mainboard = await mainboardRepo.findOne({
					where: {
						userId: user.id,
						id: growbeId,
					}
				});
				if (mainboard) {
					return AuthorizationDecision.ALLOW;
				} else {
					return AuthorizationDecision.DENY;
				}
			}
		}

		return AuthorizationDecision.ABSTAIN;
	}