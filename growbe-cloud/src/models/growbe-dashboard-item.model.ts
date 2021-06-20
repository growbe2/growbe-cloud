import {Entity, Model, model, property} from '@loopback/repository';

export enum DashboardElementType {
  GRAPH = 'graph',
  AVERAGE = 'average',
  LAST_READ = 'lastread',
  CLOCK = 'clock',
}

export enum GraphTypeEnum {
  LINE = 'line',
  BAR_VERTICAL = 'bar-vertical',
}

export enum LastXUnitEnum {
  MONTH = 'Month',
  HOURS = 'Hours',
  MINUTES = 'Minutes',
  DAY = 'Day',
  DATE = 'Date',
}


export enum IntervalUnit {
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY_OF_YEAR = 'dayOfYear',
  YEAR = 'year',
}


@model()
export class GroupingDataRequest extends Model {
  @property.array(String, {jsonSchema: {enum: Object.values(IntervalUnit)}})
  baseGroup?: IntervalUnit[];
  @property({description: '', type: 'string', jsonSchema: {enum: Object.values(IntervalUnit)}})
  intervalUnit?: IntervalUnit;
  @property({description: ''})
  intervalValue?: number;
}

@model()
export class ModuleDataRequest extends Model {
  @property({description: 'ID of the growbe to get data'})
  growbeId: string;
  @property({description: 'Module to get the data from'})
  moduleId: string;
  @property({description: 'Last X Unit of time , default to Date'})
  lastX: number;
  @property({type: 'string', jsonSchema: {enum: Object.values(LastXUnitEnum)}})
  lastXUnit?: LastXUnitEnum;
  @property({description: 'if specify , get data from interval from this date'})
  from: Date;
  @property({
    description: 'if specify , get data from interval before this date',
  })
  to: Date;
  @property.array('string', {
    description:
      'list of fields of the module to get, create one series pet fields',
  })
  fields: string[];
  @property({
    description: 'if true the data will be fetch , only possible with lastX',
  })
  liveUpdate?: boolean;
  @property()
  grouping?: GroupingDataRequest;
}

@model()
export class GraphDataConfig extends Model {
  @property()
  scheme?: any;
  @property()
  schemeType?: string;
  @property()
  customColors: any;
  @property()
  animations: boolean;
  @property()
  rangeFillOpacity: number;
  @property()
  legend?: boolean;
  @property()
  legendTitle?: string;
  @property()
  legendPosition?: string;
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
  xScaleMin: number;
  @property()
  xScaleMax: number;
  @property()
  yScaleMin: number;
  @property()
  yScaleMax: number;
  @property()
  yAxisLabel?: string;
  @property()
  xAxisLabel?: string;
  @property()
  trimXAxisTicks: boolean;
  @property()
  trimYAxisTicks: boolean;
  @property()
  maxXAxisTickLength: number;
  @property()
  maxYAxisTickLength: number;
  @property()
  rotateXAxisTicks: boolean;
  @property()
  showGridLines?: boolean;
  @property()
  roundDomains?: boolean;
  @property()
  timeline?: boolean;
  @property()
  gradient?: boolean;
  @property.array('object')
  referenceLines?: any[];
  @property()
  showRefLines: boolean;
  @property()
  showRefLabels: boolean;
}

@model()
export class BaseDashboardElement extends Model {
  @property()
  name: string;
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(DashboardElementType),
    },
  })
  type: DashboardElementType;
}

@model()
export class DashboardGraphElement extends BaseDashboardElement {
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(GraphTypeEnum),
    },
  })
  graphType: GraphTypeEnum;
  @property()
  graphConfig: GraphDataConfig;
  @property()
  graphDataConfig: ModuleDataRequest;
}

@model()
export class DashboardClockStateElement extends BaseDashboardElement {
  @property()
  id: string;
}

@model()
export class DashboardLastValueElement extends BaseDashboardElement {
  @property()
  graphDataConfig: ModuleDataRequest;
}
