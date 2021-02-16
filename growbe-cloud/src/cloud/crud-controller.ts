import { CrudControllerMixinOptions, InjectableRepository, ModelDef, ModelRelation, OPERATION_SECURITY_SPEC } from "@berlingoqc/lb-extensions";
import { GrowbeDashboard, GrowbeMainboard, GrowbeWarning } from "../models";
import { GrowbeMainboardRepository, GrowbeWarningRepository } from "../repositories";
import { authenticate } from '@loopback/authentication';
import { GrowbeDashboardRepository } from "../repositories/growbe-dashboard.repository";
import { GrowbeDashboardItem } from "../models/growbe-dashboard-item.model";

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
      idType: 'string',
      properties: [],
    },
    relations: [],
  },
  {
    model: GrowbeWarning,
    repo: GrowbeWarningRepository,
    options: {
      name: 'warnings',
      specs: specSecurity,
      properties: [],
    },
    relations: []
  },
  {
    model: GrowbeDashboard,
    repo: GrowbeDashboardRepository,
    options: {
      name: 'dashboards',
      specs: specSecurity,
      properties: [],
      idType: 'string',
    },
    relations: [
      {
        modelRelationDef: GrowbeDashboardItem,
        optionsRelation: {
          accessorType: "HasMany",
          name: 'growbeDashboardItems',
          idType: 'string',
        }
      }
    ],
  }
]