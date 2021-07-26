import { TableColumn } from "@berlingoqc/ngx-autotable";


const getZoneContent = (property: string) => (d) => `${d[property].value}` + ((d[property].offset) ? `±${d[property].offset}` : '');

export const hardwareAlarmColumns: TableColumn[] = [
  {
    title: 'Property',
    id: 'property',
    content: (d) => d.property
  },
  {
    title: 'Low',
    id: 'low',
    content: getZoneContent('low')
  },
  {
    title: 'High',
    id: 'high',
    content: getZoneContent('high')
  }
];
