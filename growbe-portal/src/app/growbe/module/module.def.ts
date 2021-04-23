export interface ModuleDef {
    name: string;
    fields: string[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModuleDefs = [
    {
        name: 'thl',
        fields: ['airTemperature', 'humidity'],
    },
];
