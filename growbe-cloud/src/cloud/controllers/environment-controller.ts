import { service } from "@loopback/core";
import { del, param, post, requestBody } from "@loopback/rest";
import {EnvironmentControllerService} from "../../services";
import {authorizeGrowbe} from "../authorization";
import {EnvironmentControllerConfiguration} from "@growbe2/growbe-pb";


export class EnvironmentControllerController {

    constructor(
        @service(EnvironmentControllerService)
        private envControllerService: EnvironmentControllerService,
    ) {}

    @post('/growbes/{id}/environmentControllerStates/config')
    @authorizeGrowbe({
      growbeIdIndex: 0,
    })
    createEnvironmentControllers(
      @param.path.string("id") growbeId: string,
      @param.query.boolean("direct") direct: boolean,
      @requestBody() config: EnvironmentControllerConfiguration,
    ) {
      return this.envControllerService.register(growbeId, config, direct);
    }

    @del('/growbes/{id}/environmentControllerStates/config/{configId}')
    @authorizeGrowbe({
      growbeIdIndex: 0,
    })
    deleteEnvironmentControllers(
      @param.path.string("id") growbeId: string,
      @param.path.string("configId") configId: string,
      @param.query.boolean("direct") direct: boolean,
    ) {
      return this.envControllerService.unregister(growbeId, configId, direct);
    }

}
