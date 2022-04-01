
const getZoneContent = (property: string) => (d) => `${d[property].value}` + ((d[property].offset) ? `±${d[property].offset}` : '');

export const getHardwareAlarmColumns = (moduleDef) => [
  {
    title: 'Property',
    id: 'property',
    content: (d) => {
      return moduleDef.properties[d.property].displayName || moduleDef.properties[d.property].name;
    }
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
