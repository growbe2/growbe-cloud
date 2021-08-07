import { service } from "@loopback/core";
import { param, post, requestBody } from "@loopback/openapi-v3";
import {authenticate} from '@loopback/authentication';
import { GraphModuleRequest, ModuleValueGraphService } from "../../services/module-value-graph.service";
import { ModuleDataRequest } from "../../models";
import { authorizeGrowbe } from "../authorization";

export class GrowbeModuleGraphController {
  constructor(
    @service(ModuleValueGraphService)
    private graphService: ModuleValueGraphService,
  ) {}

  @post('/growbes/{id}/graph')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  getGraph(
    @param.path.string('id') id: string,
    @requestBody() request: GraphModuleRequest
  ) {
    return this.graphService.getGraph(request);
  }

  @post('/growbes/{id}/one')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  getLastValue(
    @param.path.string('id') id: string,
    @requestBody() request: ModuleDataRequest
  ) {
    return this.graphService.getOneReading(request);
  }
}