import {BindingScope, injectable} from '@loopback/context';
import {model, property, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {GrowbeModuleDef} from '../models';
import {
  GrowbeMainboardRepository,
  GrowbeModuleDefRepository,
  GrowbeModuleRepository,
} from '../repositories';

@model()
export class OverrideModuleDefRequest {
  @property()
  moduleId: string;
  @property()
  moduleName: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeModuleDefService {
  constructor(
    @repository(GrowbeModuleRepository)
    private moduleRepo: GrowbeModuleRepository,
    @repository(GrowbeModuleDefRepository)
    private moduleDefRepo: GrowbeModuleDefRepository,
  ) {}

  /**
   * override the moduleDef with a new one that can
   * be modified by the user
   * @param mainboardId
   */
  async createMainboardModuleDef(
    def: GrowbeModuleDef,
    moduleId: string,
    boardId: string,
  ): Promise<GrowbeModuleDef> {
    return this.moduleDefRepo.create(
      Object.assign(def, {id: undefined, moduleId, mainboardId: boardId}),
    );
  }
}
