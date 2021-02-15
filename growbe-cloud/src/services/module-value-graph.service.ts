import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import { model, property } from '@loopback/repository';
import { GrowbeModuleValueService } from './growbe-module-value.service';

@model()
export class GraphModuleRequest {
  @property()
  growbeId: string;
  @property()
  moduleType: string;
  @property()
  from: Date;
  @property()
  to: Date;
  @property.array('string')
  fields: string[];
}


@model()
export class GraphItem {
  @property()
  at: Date;
  @property()
  value: number;
}

export class GraphModuleResponse {
  [field: string]: GraphItem[]
}

@injectable({scope: BindingScope.TRANSIENT})
export class ModuleValueGraphService {
  constructor(
    @service(GrowbeModuleValueService)
    private valueService: GrowbeModuleValueService,
  ) {}


  async getGraph(request: GraphModuleRequest): Promise<GraphModuleResponse> {
    const response = new GraphModuleResponse();
    for(const field of request.fields) { response[field] = []}
    const entries = await this.valueService.sensorValueRepository.find({
      fields: [...request.fields, 'createdAt'],
      where: {
        and: [
          {
            createdAt: {
              gte: request.from
            },
          },
          {
            createdAt: {
              lte: request.to,
            }
          }
        ]
      }
    });
    for(const e of entries) {
      for(const field of request.fields) {
        response[field].push({at: e.createdAt, value: e[field]})
      }
    }
    return response;
  }
}
