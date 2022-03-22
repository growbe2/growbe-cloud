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
            return d?.values?.[property] ? d.values?.[property]?.toFixed(2) + '' + suffix : '';
        })
    },
    AAS: {
        getContent: (property) => {
          return (d) => {
            if (!d?.values) { return ''; }
            const value = d.values?.[property];
            if (d.values.valuetype === 'calibrate') {
              if (value === -1) {
                return 'n/a';
              }
              if (!value) {
                return '';
              }
              return `${value}%`;
            }
            return value;
          }
        },
        getDiffContent: (property) => {
          return (d) => {
            if (d.current) { return ''; }
            const value = d.current?.[property];
            if (d.current.valuetype === 'calibrate') {
              if (!value || value === -1) {
                return '';
              }
              return `${value}%`
            }
          }
        }
    }
};

export const transformModuleValue = (moduleType: string, property, funct = 'getContent', content_cb = (e) => e.values[property]) => {
    const item = moduleDefPropertyDisplayer[moduleType];
    if (item && item[funct]) {
        return { content: item[funct](property) };
    }
    return {
        content: content_cb,
    }
};
