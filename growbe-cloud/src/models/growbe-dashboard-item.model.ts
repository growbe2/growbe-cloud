import {Entity, Model, model, property} from '@loopback/repository';



export enum DashboardElementType {
  GRAPH = 'graph',
  AVERAGE = 'average',
  CLOCK = 'clock'
}

export enum GraphTypeEnum {
  LINE = 'line',
  BAR_VERTICAL = 'bar-vertical',
}

@model()
export class ModuleDataRequest extends Model {
  @property()
  growbeId: string;
  @property()
  moduleId: string;
  @property()
  lastX: number; // par default jour
  @property()
  lastXUnit?: string;
  @property()
  from: Date;
  @property()
  to: Date;
  @property.array('string')
  fields: string[];
  @property()
  liveUpdate?: boolean;
}


@model()
export class GraphDataConfig extends Model {
  @property()
  legend?: boolean;
  @property()
  showLabels?: boolean;
  @property()
  xAxis?: boolean;
  @property()
  yAxis?: boolean;
  @property()
  showYAxisLabel?: boolean;
  @property()
  showXAxisLabel?: boolean;
  @property()
  yAxisLabel?: string;
  @property()
  xAxisLabel?: string;
}


@model()
export class BaseDashboardElement extends Model {
  @property()
  name: string;
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(DashboardElementType)
    }
  })
  type: DashboardElementType;
}

@model()
export class DashboardGraphElement extends BaseDashboardElement {
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(GraphTypeEnum)
    }
  })
  graphType: GraphTypeEnum;
  @property()
  graphConfig: GraphDataConfig;
  @property()
  graphDataConfig: ModuleDataRequest;
}

@model({settings: {strict: false}})
export class GrowbeDashboardItem extends Entity {

  // Define well-known properties here
  @property({
    type: 'string',
  })
  growbeDashboardId?: string;
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id?: string

  @property()
  name: string;

  @property.array(() => BaseDashboardElement)
  items: BaseDashboardElement[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrowbeDashboardItem>) {
    super(data);
  }
}

export interface GrowbeDashboardItemRelations {
  // describe navigational properties here
}

export type GrowbeDashboardItemWithRelations = GrowbeDashboardItem & GrowbeDashboardItemRelations;
