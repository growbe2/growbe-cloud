import {injectable, BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { UserPreference } from '../models';
import { UserPreferenceRepository } from '../repositories/user-preference.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class UserPreferenceService {

  constructor(
    @repository(UserPreferenceRepository)
    private userPreferenceRepository: UserPreferenceRepository,
  ) {}

  async getUserPreference(userId: string): Promise<UserPreference> {
    const userPref = await this.userPreferenceRepository.findOne({ where: { userId }});
    if (!userPref) {
      return this.userPreferenceRepository.create({userId});
    }
    return userPref;
  }

  updateUserPreference(userId: string, preference: Partial<UserPreference>) {
    return this.userPreferenceRepository.updateAll(preference, {
      userId
    });
  }

}
