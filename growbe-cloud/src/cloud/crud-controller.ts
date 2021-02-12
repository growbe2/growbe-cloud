import { CrudControllerMixinOptions, InjectableRepository, ModelDef, ModelRelation, OPERATION_SECURITY_SPEC } from "@berlingoqc/lb-extensions";
import { GrowbeMainboard } from "../models";
import { GrowbeMainboardRepository } from "../repositories";
import { authenticate } from '@loopback/authentication';

const auth = {
  func: authenticate,
  args: ['jwt'],
};

const security = {security: OPERATION_SECURITY_SPEC};

const specSecurity: any = {
  count: security,
  create: security,
  deleteById: security,
  find: security,
  findById: security,
  replaceById: security,
  updateAll: security,
  updateById: security,
};

export const CRUD_CONTROLLERS: {
  model: ModelDef;
  repo: InjectableRepository<any, any>;
  options: CrudControllerMixinOptions;
  relations: ModelRelation[];
}[] = [
  // Activity
  {
    model: GrowbeMainboard,
    repo: GrowbeMainboardRepository,
    options: {
      name: 'growbes',
      specs: specSecurity,
      properties: [],
    },
    relations: [],
  }
]