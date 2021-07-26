import { TableColumn } from "@berlingoqc/ngx-autotable";



export const hardwareAlarmColumns: TableColumn[] = [
  {
    title: 'test',
    id: 'test',
    content: (d) => d.moduleId
  }
];
