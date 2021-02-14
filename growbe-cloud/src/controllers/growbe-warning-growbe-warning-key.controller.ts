import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GrowbeWarning,
  GrowbeWarningKey,
} from '../models';
import {GrowbeWarningRepository} from '../repositories';

export class GrowbeWarningGrowbeWarningKeyController {
  constructor(
    @repository(GrowbeWarningRepository)
    public growbeWarningRepository: GrowbeWarningRepository,
  ) { }

  @get('/growbe-warnings/{id}/growbe-warning-key', {
    responses: {
      '200': {
        description: 'GrowbeWarningKey belonging to GrowbeWarning',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrowbeWarningKey)},
          },
        },
      },
    },
  })
  async getGrowbeWarningKey(
    @param.path.number('id') id: typeof GrowbeWarning.prototype.id,
  ): Promise<GrowbeWarningKey> {
    return this.growbeWarningRepository.warningKey(id);
  }
}
