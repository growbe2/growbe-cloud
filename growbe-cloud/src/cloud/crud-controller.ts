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
  GrowbeWarning,
  VirtualRelay
} from '../models';
import {
  GrowbeLogsRepository,
  GrowbeMainboardRepository,
  GrowbeModuleDefRepository,
  GrowbeModuleRepository,
  GrowbeSensorValueRepository,
  GrowbeWarningKeyRepository,
  VirtualRelayRepository,
} from '../repositories';
import {GrowbeDashboardRepository} from '../repositories/growbe-dashboard.repository';

import {
  authorize,
} from '@loopback/authorization'
import { getVoterMainboardUserOrOrganisation, getMainboardByModule, getMainboardByModuleDef } from './authorization';
import _ from 'lodash';
import { DeviceLogs, DeviceLogsRepository } from '../component/device-logs';

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
  'count': [auth, authorizeGrowbeModuleDefId],
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
        modelRelationDef: DeviceLogs,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'deviceLogs',
          idType: 'string',
          repo: DeviceLogsRepository,
          specs: specSecurity,
          parentIdKey: 'mainboardId',
          properties: protectByMainboardRelationProperties
        } as any
      },
      {
        modelRelationDef: GrowbeWarning,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeWarnings',
          idType: 'string',
          repo: GrowbeWarningKeyRepository,
          specs: specSecurity,
          parentIdKey: 'growbeMainboardId',
          properties: protectByMainboardRelationProperties
        } as any,
      },
      {
        modelRelationDef: GrowbeModule,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeModules',
          idType: 'string',
          repo: GrowbeModuleRepository,
          parentIdKey: 'mainboardId',
          specs: specSecurity,
          properties: protectByMainboardRelationProperties
        } as any,
      },
      {
        modelRelationDef: GrowbeSensorValue,
        optionsRelation: {
          accessorType: 'HasMany',
          name: 'growbeSensorValues',
          idType: 'string',
          repo: GrowbeSensorValueRepository,
          specs: specSecurity,
          parentIdKey: 'growbeMainboardId',
          properties: protectByMainboardRelationProperties
        } as any,
      },
      {
        modelRelationDef: GrowbeLogs,
        optionsRelation: {
          accessorType: 'HasMany',
          specs: specSecurity,
          name: 'growbeLogs',
          repo: GrowbeLogsRepository,
          idType: 'string',
          parentIdKey: 'growbeMainboardId',
          properties: protectByMainboardRelationProperties
        } as any,
      },
      {
        modelRelationDef: VirtualRelay,
        optionsRelation: {
          accessorType: 'HasMany',
          specs: specSecurity,
          name: 'virtualRelays',
          idType: 'string',
          parentIdKey: 'growbeMainboardId',
          repo: VirtualRelayRepository,
          properties: _.omit(protectByMainboardRelationProperties, ['create', 'deleteById', 'delete', 'updateById']),
        } as any
      }
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
          repo: GrowbeSensorValueRepository,
          parentIdKey: 'moduleId',
          properties: protectByModuleRelationProperties
        } as any,
      },
      {
        modelRelationDef: GrowbeModuleDef,
        optionsRelation: {
          accessorType: 'HasOne',
          name: 'moduleDef',
          idType: 'number',
          specs: specSecurity,
          repo: GrowbeModuleDefRepository,
          parentIdKey: 'moduleId',
          properties: protectByModuleRelationProperties,
          disableds: ['deleteById', 'create'],
        } as any
      }
    ],
  },
  {
    model: GrowbeDashboard,
    repo: GrowbeDashboardRepository,
    options: {
      name: 'dashboards',
      specs: specSecurity,
      idType: 'string',
      disableds: [
        'find',
      ],
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
