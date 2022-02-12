/* eslint-disable @typescript-eslint/naming-convention */
export const moduleDefPropertyDisplayer = {
    AAB: {
        property: 'state',
        type: 'boolean',
        default: false,
    },
    AAP: {
        property: 'state',
        type: 'boolean',
        default: false,
    },
    AAA: {
        round: {}
    }
};

export const transformModuleValue = (moduleType: string, value: any) => {
    if (value) {
      const item = moduleDefPropertyDisplayer[moduleType];
      if (item) {
          if (item.property) {
              value = value[item.property] ?? item.default;
          }
          if (item.round) {
            value = value.toFixed(2);
          }
      }
    }
    return value;
};
