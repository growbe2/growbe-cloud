import {inject, BindingScope, injectable, service} from '@loopback/core';
import {Entity, model, property, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {format} from 'date-fns';
import {MongoDataSource} from '../datasources';
import {GroupingDataRequest, GrowbeSensorValue, LastXUnitEnum, ModuleDataRequest} from '../models';
import {GrowbeModuleService} from './growbe-module.service';

@model()
export class GraphModuleRequest extends ModuleDataRequest {}

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

@model()
export class ModuleAverageItem extends Entity {
  @property()
  field: string;

  @property()
  reads: number;

  @property()
  average: number;
}

@model()
export class ModuleAverageData {
  @property()
  name: string;
  @property.array(() => ModuleAverageItem)
  items: ModuleAverageItem[];
}

@injectable({scope: BindingScope.TRANSIENT})
export class ModuleValueGraphService {
  constructor(
    @inject('datasources.mongo')
    private dataSource: MongoDataSource,
    @service(GrowbeModuleService)
    private valueService: GrowbeModuleService,
  ) {}

  // retourne la dernière lecture des trucs
  async getOneReading(request: ModuleDataRequest): Promise<any> {
    return this.getModuleSensorData(request, [ { $sort: { createdAt: -1}}, { $limit: 1}]);
  }

  // retourne une graphique des valeurs d'une module
  async getGraph(request: GraphModuleRequest): Promise<GraphSerie[]> {
    if (request.grouping) {
        if (request.grouping.intervalUnit === "minute") {
            request.grouping.baseGroup = ["dayOfYear", "hour"] as any;
        } else {
            request.grouping.baseGroup = ["dayOfYear"] as any;
        }
    }
    const series: GraphSerie[] = [];
    for (const field of request.fields) {
      series.push({name: field, series: []});
    }
    const entries = await this.getModuleSensorData(request, [ { $sort: { createdAt: 1}}]);
    for (const e of entries) {
      let i = 0;
      for (const field of request.fields) {
        const value = this.getValue(e, field);
        if (value == undefined) {
            continue
        }
        series[i].series.push({
          name: e.createdAt,
          value,
        });
        i++;
      }
    }
    return series;
  }

  private getValue(object: any, propAny: string) {
    return object[propAny];
  }

  /**
   * get the series data for the time range
   *
   */
  private async getModuleSensorData(
    request: ModuleDataRequest,
    stages: any[] = [],
  ) {
    const fieldProjects = Object.fromEntries(
      request.fields.map(field => [field, `$values.${field}`]),
    );
    const fieldGroup = Object.fromEntries(
      request.fields.map(field => [field, {$avg: `$${field}`}]),
    );
    const fieldGroupProject = Object.fromEntries(
      request.fields.map(field => [field, '$' + field])
    );
    const dateConfig = this.getDateCondifition(request);
    const aggregateRequest = [
      {
        $match: {
          moduleId: request.moduleId,
          ...dateConfig,
        },
      },
      {
        $project: {
          createdAt: {
            $toDate: '$createdAt',
          },
          endingAt: {
            $toDate: '$endingAt',
          },
          createdAtNumber: '$createdAt',
          ...fieldProjects,
        },
      },
      ...((request.grouping) ?
      [{
        $group: {
          _id: this.getGroupingId(request.grouping),
          createdAt: {
              $avg: '$createdAtNumber',
          },
          ...fieldGroup,
        },

      },
      {
        $project: {
          createdAt: {$toDate: '$createdAt'},
          ...fieldGroupProject,
        }
      }
    ] : []),
      ...stages,
    ].filter(item => item);

    const datas = await (this.dataSource.executeCustom(
      'GrowbeSensorValue',
      'aggregate',
      aggregateRequest,
    ).then((item: any) => item.get()))
    

    return datas as any[];
  }


  private getGroupingId(
    request: GroupingDataRequest
  ): any {
      const groupingId: any = {};
      if (request.baseGroup) {
        request.baseGroup.forEach((bg) => {
          const property = `$${bg}`;
          groupingId[bg] = {
            [property]: '$createdAt'
          };
        })
      }
      if (request.intervalValue) {
        const property = `$${request.intervalUnit ?? 'minute'}`
        groupingId['interval'] = {
          "$subtract": [
            { [property]: "$createdAt" },
            { "$mod": [{ [property]: "$createdAt"}, request.intervalValue]}
          ]
        }
      }
      return groupingId;
  }

  private getDateCondifition(
    request: ModuleDataRequest,
  ): any {
    const condition: any = {};
    if (request.from && request.to) {
      condition.createdAt = {
        "$gte": new Date(request.from).getTime(),
        "$lt": new Date(request.to).getTime(),
      }
    } else if(request.from) {
      condition.createdAt = { "$gte": new Date(request.from).getTime()}
    } else if(request.to) {
      condition.createdAt = { "$lte": new Date(request.to).getTime() } 
    } else if(request.lastX) {
      const date: any = new Date();
      const unit = request.lastXUnit ?? 'Date';
      const set = `set${unit}`;
      const get = `get${unit}`;
      const d = date[get]() - request.lastX;
      date[set](d);
      condition.createdAt = { '$gte': date.getTime() };
    }
    
    return condition;
  }
}
