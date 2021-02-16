import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import {model, property} from '@loopback/repository';
import {GrowbeModuleValueService} from './growbe-module-value.service';

@model()
export class GraphModuleRequest {
  @property()
  growbeId: string;
  @property()
  moduleType: string;
  @property()
  lastX: number; // par default jour
  @property()
  lastXUnit?: string;
  @property()
  liveUpdate: boolean;
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
  name: string;
  @property()
  value: number;
}

@model()
export class GraphSerie {
  @property()
  name: string;
  @property.array(() => GraphItem)
  series: GraphItem[];
}

@injectable({scope: BindingScope.TRANSIENT})
export class ModuleValueGraphService {
  constructor(
    @service(GrowbeModuleValueService)
    private valueService: GrowbeModuleValueService,
  ) {}

  async getGraph(request: GraphModuleRequest): Promise<GraphSerie[]> {
    const series: GraphSerie[] = [];
    const entries = await this.valueService.sensorValueRepository.find({
      fields: [...request.fields, 'createdAt'],
      where: {
        and: this.getDateCondifition(request),
      },
    });
    for (const field of request.fields) {
      series.push({name: field, series: []});
    }
    for (const e of entries) {
      let i = 0;
      for (const field of request.fields) {
        series[i].series.push({
          name: e.createdAt.toLocaleString(),
          value: e[field],
        });
        i++;
      }
    }
    return series;
  }

  private getDateCondifition(request: GraphModuleRequest) {
    if (request.from && request.to) {
      return [
        {
          createdAt: {
            gte: request.from,
          },
        },
        {
          createdAt: {
            lte: request.to,
          },
        },
      ];
    } else if(request.from) {
      return [{createAt: {gte: request.from}}]
    } else if(request.to) {
      return [{createAt: {lte: request.from}}]
    } else if(request.lastX) {
      const date:any = new Date();
      const unit = request.lastXUnit ?? 'Date';
      const set = `set${unit}`;
      const get = `get${unit}`;
      const d = date[get]() - request.lastX;
      date[set](d);
      return [{createdAt: {gte: date}}]
    }

  }
}
