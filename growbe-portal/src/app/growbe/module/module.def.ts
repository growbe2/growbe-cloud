/* eslint-disable @typescript-eslint/naming-convention */
const relay = (property) => ({
        type: 'icon',
        content: (d) => {
            return d.values[property].state ? 'power' : 'power_off'
        },
});

export const moduleDefPropertyDisplayer = {
    AAB: {
        getContent: relay
    },
    AAP: {
        getContent: relay
    },
    AAA: {
        getContent: (property) => ((d) => {
            const suffix = (property === 'humidity') ? '%' : '°C';
            return d?.values ? d.values[property].toFixed(2) + '' + suffix : '';
        })
    },
    AAS: {
        getContent: (property) => {
          return (d) => {
            if (!d?.values) { return ''; }
            const value = d.values[property];
            if (d.values.valuetype === 'calibrate') {
              if (value === -1) {
                return 'n/a';
              }
              return `${value}%`;
            }
            return value;
          }
        }
    }
};

export const transformModuleValue = (moduleType: string, property) => {
    const item = moduleDefPropertyDisplayer[moduleType];
    if (item && item.getContent) {
        return { content: item.getContent(property) };
    }
    return {
        content: (e) => e.values[property],
    }
};
