/* eslint-disable @typescript-eslint/naming-convention */
const relay = (property) => ({
        type: 'icon',
        content: (d) => {
            return d.values[property].state ? 'power' : 'power_off'
        },
});

const default_content = (property) => {
  return (d) => {
    return d.values?.[property]?.toFixed(2);
  }
}

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
    PPO: {
      getContent: default_content,
    },
    PAL: {
      getContent: default_content,
    },
    PAC: {
      getContent: default_content,
    },
    PPR: {
      getContent: default_content
    },
    PCS: {
      getContent: (property) => {
        return (d) => {
          if (property == "status") {
            return ['Stopped', 'Running', 'Error'][d.values?.[property] || 0];
          } else if (property == "error") {
            return d.values?.[property]|| '';
          } else if (property == "faces") {
            return d.values?.[property] ? d.values?.[property].length : '';
          } else if (property == "fps") {
            return d?.values?.[property] ? d.values?.[property]?.toFixed(0) : '';
          } else if (property == "bitrate") {
            return d?.values?.[property] ? (d.values?.[property] / 1024).toFixed(0) + '/kbs' : ''
          }
        };
      }
    },
    CCS: {
      getContent: default_content,
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
                return '0%';
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
