export const transformFieldSubmit = (property: string, data: any) => ({
    mode: data.object[property].config.type === 'manual' ? 0 : 1,
    [data.object[property].config.type]:
        data.object[property].config.type === 'manual'
            ? data.object[property].config.data
            : {
                  begining: {
                      hour: +data.object[property].config.data.begining.split(
                          ':',
                      )[0],
                      minute: +data.object[property].config.data.begining.split(
                          ':',
                      )[1],
                  },
                  end: {
                      hour: +data.object[property].config.data.end.split(
                          ':',
                      )[0],
                      minute: +data.object[property].config.data.end.split(
                          ':',
                      )[1],
                  },
              },
});

export const transformFieldInit = (property: string, config: any) => ({
    config: {
        type: config?.[property]?.mode === 1 ? 'alarm' : 'manual',
        data:
            config?.[property]?.mode === 1
                ? {
                      begining:
                          config?.[property].alarm?.begining?.hour +
                          ':' +
                          config?.[property].alarm?.begining?.minute,
                      end:
                          config?.[property].alarm?.end?.hour +
                          ':' +
                          config?.[property].alarm?.end?.minute,
                  }
                : config?.[property]?.manual
    },
});
