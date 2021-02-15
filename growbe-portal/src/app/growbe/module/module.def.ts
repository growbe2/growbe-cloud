

export interface ModuleDef {
  name: string;
  fields: string[];
}


export const ModuleDefs = [
  {
    name: 'thl',
    fields: ['airTemperature', 'humidity']
  }
]
