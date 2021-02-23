import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GrowbeModule,
  GrowbeModuleDef,
} from '../models';
import {GrowbeModuleRepository} from '../repositories';

export class GrowbeModuleGrowbeModuleDefController {
  constructor(
    @repository(GrowbeModuleRepository)
    public growbeModuleRepository: GrowbeModuleRepository,
  ) { }

  @get('/growbe-modules/{id}/growbe-module-def', {
    responses: {
      '200': {
        description: 'GrowbeModuleDef belonging to GrowbeModule',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GrowbeModuleDef)},
          },
        },
      },
    },
  })
  async getGrowbeModuleDef(
    @param.path.string('id') id: typeof GrowbeModule.prototype.id,
  ): Promise<GrowbeModuleDef> {
    return this.growbeModuleRepository.moduleDef(id);
  }
}
