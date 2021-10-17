
import { UserPreferenceService } from '../../services';
import {authenticate} from '@loopback/authentication';
import { get, patch, requestBody } from '@loopback/openapi-v3';
import { inject } from '@loopback/context';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { UserPreference } from '../../models';

export class UserPreferenceController {

	constructor(
		private userPreferenceService: UserPreferenceService,
	) {}

	@get('/preferences')
	@authenticate('jwt')
	getUserPreference(
		@inject(SecurityBindings.USER) user: UserProfile,
	) {
		return this.userPreferenceService.getUserPreference(user.id);
	}

	@patch('/preferences')
	@authenticate('jwt')
	patchUserPreference(
		@inject(SecurityBindings.USER) user: UserProfile,
		@requestBody() userPreference: UserPreference,
	) {
		return this.userPreferenceService.updateUserPreference(user.id, userPreference)
	}
}