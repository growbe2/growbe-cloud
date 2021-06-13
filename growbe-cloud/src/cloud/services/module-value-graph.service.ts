import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {Entity, model, property, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {format} from 'date-fns';
import {GrowbeSensorValue, ModuleDataRequest} from '../../models';
import {GrowbeModuleService} from '../../services/growbe-module.service';

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
    @service(GrowbeModuleService)
    private valueService: GrowbeModuleService,
  ) {}

  // retourne la dernière lecture des trucs
  async getLastRead(request: ModuleDataRequest): Promise<GrowbeSensorValue> {
    const data = await this.valueService.sensorValueRepository.findOne({
      //fields: [...request.fields, 'createdAt'],
      where: {
        moduleId: request.moduleId,
        growbeMainboardId: request.growbeId,
        or: request.fields.map(field => ({[field]: {neq: null}})),
      },
      order: ['createdAt DESC'],
    });
    if (!data) throw new HttpErrors[404]('');
    return data;
  }

  // retourne la valeur moyen pour une durée x
  async getAverage(request: ModuleDataRequest): Promise<GraphSerie[]> {
    const entries = await this.getModuleSensorData(request);
    const series = request.fields.map(
      f => ({name: f, series: [{name: f, value: 0, reads: 0}]} as any),
    );
    for (const e of entries) {
      for (let i = 0; i < request.fields.length; i++) {
        const field = request.fields[i];
        const value = this.getValue(e, field);
        if (!value) continue;
        series[i].series[0].value += value;
        series[i].series[0].reads += 1;
      }
    }
    series.forEach(
      x => (x.series[0].value = x.series[0].value / x.series[0].reads),
    );
    return series;
  }

  // retourne une graphique des valeurs d'une module
  async getGraph(request: GraphModuleRequest): Promise<GraphSerie[]> {
    const series: GraphSerie[] = [];
    for (const field of request.fields) {
      series.push({name: field, series: []});
    }
    const entries = await this.getModuleSensorData(request);
    for (const e of entries) {
      let i = 0;
      for (const field of request.fields) {
        const value = this.getValue(e, field);
        if (!value) continue;
        series[i].series.push({
          name: format(e.createdAt, 'MM/dd/yyyy HH:mm:ss'),
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

  private async getModuleSensorData(request: ModuleDataRequest) {
    const customquery = [];
    const entries = await this.valueService.sensorValueRepository.find({
      // fields: [...request.fields, 'createdAt'],
      where: {
        moduleId: request.moduleId,
        and: [...this.getDateCondifition(request)],
        or: request.fields.map(field => ({[field]: {neq: null}})),
      },
    });
    return entries;
  }

  private getDateCondifition(
    request: ModuleDataRequest,
  ): Where<GrowbeSensorValue>[] {
    if (request.from && request.to) {
      return [
        {
          createdAt: {
            gte: request.from.getTime(),
          },
        },
        {
          createdAt: {
            lte: request.to.getTime(),
          },
        },
      ];
    } else if (request.from) {
      return [{createdAt: {gte: request.from.getTime()}}];
    } else if (request.to) {
      return [{createdAt: {lte: request.to.getTime()}}];
    } else if (request.lastX) {
      const date: any = new Date();
      const unit = request.lastXUnit ?? 'Date';
      const set = `set${unit}`;
      const get = `get${unit}`;
      const d = date[get]() - request.lastX;
      date[set](d);
      return [{createdAt: {gte: date}}];
    }
    return [];
  }
}
