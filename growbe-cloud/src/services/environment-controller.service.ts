import {EnvironmentControllerConfiguration, EnvironmentControllerEvent} from "@growbe2/growbe-pb";
import {BindingScope, injectable, service} from "@loopback/core";
import {repository} from "@loopback/repository";
import {HttpErrors} from "@loopback/rest";
import {EnvironmentControllerState, GroupEnum} from "../models";
import {EnvironmentControllerStateRepository} from "../repositories";
import {GrowbeActionService} from "./growbe-action.service";
import {GrowbeLogsService} from "./growbe-logs.service";


@injectable({scope: BindingScope.TRANSIENT})
export class EnvironmentControllerService {
  constructor(
    @service(GrowbeActionService)
    private actionService: GrowbeActionService,
    @service(GrowbeLogsService)
    private logService: GrowbeLogsService,
    @repository(EnvironmentControllerStateRepository)
    private ecsRepo : EnvironmentControllerStateRepository,
  ) {}

  async register(
    growbeId: string,
    config: EnvironmentControllerConfiguration
  ) {
    try {
      await this.ecsRepo.findById(config.id);
      throw new HttpErrors.Conflict("already exists");
    } catch (_e) {}

    let response = await this.actionService.sendRequest({
      growbeId,
      topic: "/board/aEnv",
      payload: EnvironmentControllerConfiguration.encode(config).finish(),
    });

    await this.ecsRepo.create(new EnvironmentControllerState({
      id: config.id,
      growbeId,
      state: false,
      config,
    }));

    return response;
  }

  async unregister(growbeId: string, id: string) {
    let state = await this.ecsRepo.findById(id);
    let response = await this.actionService.sendRequest({
      growbeId,
      topic: "/board/rEnv",
      payload: '',
    });

    state.state = false;
    await this.ecsRepo.update(state);

    return response;
  }

  onEvent(growbeId: string, event: EnvironmentControllerEvent) {
    return this.logService.addLog({
      growbeMainboardId: growbeId,
      type: "env_controller" as any,
      group: GroupEnum.MAINBOARD,
      message: `running ${event.running} state ${event.state}`,
      newState: event,
    });
  }
}
