import {
  CrudControllerMixinOptions,
  InjectableRepository,
  ModelDef,
  ModelRelation,
  OPERATION_SECURITY_SPEC, } from '@berlingoqc/lb-extensions'; import { GrowbeDashboard, GrowbeLogs,
  GrowbeMainboard,
  GrowbeModule,
  GrowbeModuleDef,
  GrowbeSensorValue,
  GrowbeWarning,
} from '../models';
import {
  GrowbeMainboardRepository,
        GrowbeModuleDefRepository,
  GrowbeModuleRepository,
  GrowbeWarningRepository,
} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {GrowbeDashboardRepository} from '../repositories/growbe-dashboard.repository';
import {GrowbeDashboardItem} from '../models/growbe-dashboard-item.model';
import {GrowbeMainboardConfig} from '@growbe2/growbe-pb';

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
    relations: [
      {
        modelRelationDef: GrowbeWarning,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeWarnings',
          idType: 'string',
        },
      },
      {
        modelRelationDef: GrowbeModule,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeModules',
          idType: 'string',
        },
      },
      {
        modelRelationDef: GrowbeSensorValue,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeSensorValues',
          idType: 'string',
        },
      },
      {
        modelRelationDef: GrowbeLogs,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeLogs',
          idType: 'string',
        },
      },
    ],
  },
  {
    model: GrowbeModuleDef,
    repo: GrowbeModuleDefRepository,
    options: {
      name: 'growbeModuleDefs',
      specs: specSecurity,
      omitId: false,
      properties: [],

    },
    relations: [],
  },
  {
    model: GrowbeModule,
    repo: GrowbeModuleRepository,
    options: {
      name: 'growbeModules',
      specs: specSecurity,
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
    relations: [],
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
          accessorType: 'HasMany',
          name: 'growbeDashboardItems',
          idType: 'string',
        },
      },
    ],
  },
];
