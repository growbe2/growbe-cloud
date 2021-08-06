import {
  CrudControllerMixinOptions,
  InjectableRepository,
  ModelDef,
  ModelRelation,
  OPERATION_SECURITY_SPEC
} from '@berlingoqc/lb-extensions';
import {authenticate} from '@loopback/authentication';
import {GrowbeStream, GrowbeStreamRepository} from '../component';
import {
  GrowbeDashboard,
  GrowbeLogs,
  GrowbeMainboard,
  GrowbeModule,
  GrowbeModuleDef,
  GrowbeSensorValue,
  GrowbeWarning
} from '../models';
import {
  GrowbeMainboardRepository,
  GrowbeModuleDefRepository,
  GrowbeModuleRepository,
} from '../repositories';
import {GrowbeDashboardRepository} from '../repositories/growbe-dashboard.repository';

import {
  authorize,
} from '@loopback/authorization'
import { getVoterMainboardUserOrOrganisation, getMainboardByModule, getMainboardByModuleDef } from './authorization';

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

const authorizeGrowbeId = {
  func: authorize,
   args: [
        {
          voters: [
            getVoterMainboardUserOrOrganisation(
              0,
            ),
          ],
        },
      ],
}

const authorizeGrowbeModuleId = {
  func: authorize,
   args: [
        {
          voters: [
            getVoterMainboardUserOrOrganisation(
              0,
              undefined,
              undefined,
              undefined,
              undefined,
              getMainboardByModule,
            ),
          ],
        },
      ],
}

const authorizeGrowbeModuleDefId = {
  func: authorize,
   args: [
        {
          voters: [
            getVoterMainboardUserOrOrganisation(
              0,
              undefined,
              undefined,
              undefined,
              undefined,
              getMainboardByModuleDef,
            ),
          ],
        },
      ],
}

const authorizeAdmin = {
  func: authorize,
  args: [
    {
      allowedRoles: ['ADMIN']
    }
  ]
}

const protectByMainboardProperties = {
  'count': [auth, authorizeAdmin],
  'create': [auth, authorizeAdmin],
  'find': [auth, authorizeAdmin],
  'updateAll': [auth, authorizeAdmin],
  'deleteById': [auth, authorizeGrowbeId],
  'findById': [auth, authorizeGrowbeId],
  'replaceById': [auth, authorizeGrowbeId],
  'updateById': [auth, authorizeGrowbeId],
}

const protectByMainboardRelationProperties = {
  'create': [auth, authorizeGrowbeId],
  'deleteById': [auth, authorizeGrowbeId],
  'updateById': [auth, authorizeGrowbeId],
  'find': [auth, authorizeGrowbeId],
  'findById': [auth, authorizeGrowbeId],
}

const protectByModuleProperties = {
  'count': [auth, authorizeAdmin],
  'create': [auth, authorizeAdmin],
  'find': [auth, authorizeAdmin],
  'updateAll': [auth, authorizeAdmin],
  'deleteById': [auth, authorizeGrowbeModuleId],
  'findById': [auth, authorizeGrowbeModuleId],
  'replaceById': [auth, authorizeGrowbeModuleId],
  'updateById': [auth, authorizeGrowbeModuleId],
}

const protectByModuleDefProperties = {
  'findById': [auth, authorizeGrowbeModuleDefId],
  'updateById': [auth, authorizeGrowbeModuleDefId],
}

const protectByModuleRelationProperties = {
  'create': [auth, authorizeGrowbeModuleId],
  'deleteById': [auth, authorizeGrowbeModuleId],
  'updateById': [auth, authorizeGrowbeModuleId],
  'find': [auth, authorizeGrowbeModuleId],
  'findById': [auth, authorizeGrowbeModuleId],
}

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
      properties: protectByMainboardProperties,
    },
    relations: [
      {
        modelRelationDef: GrowbeWarning,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeWarnings',
          idType: 'string',
          specs: specSecurity,
          properties: protectByMainboardRelationProperties
        },
      },
      {
        modelRelationDef: GrowbeModule,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeModules',
          idType: 'string',
          specs: specSecurity,
          properties: protectByMainboardRelationProperties
        },
      },
      {
        modelRelationDef: GrowbeSensorValue,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeSensorValues',
          idType: 'string',
          specs: specSecurity,
          properties: protectByMainboardRelationProperties
        },
      },
      {
        modelRelationDef: GrowbeLogs,
        optionsRelation: {
          accessorType: 'HasMany',
          specs: specSecurity,
          name: 'growbeLogs',
          idType: 'string',
          properties: protectByMainboardRelationProperties
        },
      },
    ],
  },
  {
    model: GrowbeModule,
    repo: GrowbeModuleRepository,
    options: {
      name: 'growbeModules',
      specs: specSecurity,
      idType: 'string',
      properties: protectByModuleProperties
    },
    relations: [
      {
        modelRelationDef: GrowbeSensorValue,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeSensorValues',
          idType: 'string',
          specs: specSecurity,
          properties: protectByModuleRelationProperties
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
      idType: 'string',
      omitId: false,
      properties: protectByModuleDefProperties,
      disableds: ['count', 'create', 'deleteById', 'find', 'replaceById', 'updateAll']
    },
    relations: [],
  },
  {
    model: GrowbeDashboard,
    repo: GrowbeDashboardRepository,
    options: {
      name: 'dashboards',
      specs: specSecurity,
      idType: 'string',
      properties: [
        auth,
      ]
    },
    relations: [],
  },
  {
    model: GrowbeStream,
    repo: GrowbeStreamRepository,
    options: {
      name: 'growbeStreams',
      specs: specSecurity,
      properties: [auth],
      disableds: [
        'count',
        'create',
        'find',
        'findById',
        'replaceById',
        'updateAll',
        'updateById',
      ],
      idType: 'string',
    },
    relations: [],
  },
];
