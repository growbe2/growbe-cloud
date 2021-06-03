
export const moduleDefPropertyDisplayer = {
  'AAB': {
    property: 'state',
    type: 'boolean',
  }
}


export const transformModuleValue = (moduleType: string, value: any) => {
  const item = moduleDefPropertyDisplayer[moduleType];
  if (item) {
    if (item.property) {
      value = value[item.property]
    }
  }
  return value;
}
