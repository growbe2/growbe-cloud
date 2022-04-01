import {addCRUDModelsControllerWithRelations, addStorageController, FileStorageService, StorageBindings, StorageComponent} from '@berlingoqc/lb-extensions';
import {Binding, Component, CoreBindings, inject} from '@loopback/core';
import {ApplicationWithRepositories} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ActionResponse} from '@growbe2/growbe-pb';
import {
  GrowbeStreamComponent,
  GrowbeStreamRepository,
  NMSBindings,
} from '../component';
import { GrowbeMainboardBindings } from '../keys';
import { DataSubject } from '../observers/data-subject.model';
import { GrowbeActionReponseService } from '../services';
import {
  GrowbeMainboardController,
  GrowbeMainboardActionController,
  GrowbeModuleDefController,
  GrowbeModuleController,
  GrowbeModuleGraphController,
  UserPreferenceController,
  GrowbeMainboardVersionController,
  GrowbeModuleCalibrationController,
  VirtualRelayController,
  GrowbeDashboardController,
  GrowbeHardwareAlarmController,
} from './controllers';
import {authenticate} from '@loopback/authentication';
import {CRUD_CONTROLLERS} from './crud-controller';

export const watchers: DataSubject[] = [
  {
    func: (id, service: GrowbeActionReponseService, action: any) => {
      return service.receiveActionResponse(id, action);
    },
    model: ActionResponse,
    regexTopic: 'response',
    service: GrowbeActionReponseService,
  }
];

export class CloudComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: RestApplication & ApplicationWithRepositories,
  ) {
    addCRUDModelsControllerWithRelations(app, CRUD_CONTROLLERS);

    const nmsToken = process.env.NMS_TOKEN;
    if (nmsToken) {
      app.bind(NMSBindings.NMS_KEY).to(nmsToken);
      app.bind(NMSBindings.NMS_PASSWORD).to(process.env.NMS_API_PASSWORD ?? '');
      app.bind(NMSBindings.NMS_USERNAME).to(process.env.NMS_API_USERNAME ?? '');
      app.bind(NMSBindings.NMS_URL).to(process.env.NMS_API_URL ?? '');
      app.component(GrowbeStreamComponent);
      app.repository(GrowbeStreamRepository);
    }

    app.bind(GrowbeMainboardBindings.WATCHERS).to(watchers);


    // setup storage , in the future different microservice
    app.component(StorageComponent);
    app.bind(StorageBindings.STORAGE_PROVIDER).toClass(FileStorageService);
    app.bind(StorageBindings.STORAGE_OPTIONS).to({
      destination: './storage'
    } as any);
    addStorageController(app, {
      properties: [{args: ['jwt'], func: authenticate}],
    });
  }

  controllers = [
    GrowbeMainboardController,
    GrowbeMainboardActionController,
    GrowbeModuleDefController,
    GrowbeModuleGraphController,
    GrowbeMainboardVersionController,
    GrowbeModuleController,
    UserPreferenceController,
    GrowbeModuleCalibrationController,
    VirtualRelayController,
    GrowbeDashboardController,
    GrowbeHardwareAlarmController,
  ];
  bindings = [
    // Binding.bind(GrowbeMainboardBindings.WATCHERS).to(watchers)
  ];
}
