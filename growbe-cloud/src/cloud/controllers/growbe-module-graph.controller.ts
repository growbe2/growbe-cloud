import { service } from "@loopback/core";
import { post, requestBody } from "@loopback/openapi-v3";
import {authenticate} from '@loopback/authentication';
import { GraphModuleRequest, ModuleValueGraphService } from "../../services/module-value-graph.service";
import { ModuleDataRequest } from "../../models";

export class GrowbeModuleGraphController {
  constructor(
    @service(ModuleValueGraphService)
    private graphService: ModuleValueGraphService,
  ) {}

  @post('/growbe/graph')
  @authenticate('jwt')
  getGraph(@requestBody() request: GraphModuleRequest) {
    return this.graphService.getGraph(request);
  }

  @post('/growbe/one')
  @authenticate('jwt')
  getLastValue(@requestBody() request: ModuleDataRequest) {
    return this.graphService.getOneReading(request);
  }
}