import {authorize, AuthorizationDecision, AuthorizationContext, AuthorizationMetadata} from '@loopback/authorization';

// get a voter to valid that the user is member or the organisation or user that
// possess de mainboard
export const getVoterMainboardUserOrOrganisation = () => 
	(ctx: AuthorizationContext, metadata: AuthorizationMetadata) => {
		return 
	}