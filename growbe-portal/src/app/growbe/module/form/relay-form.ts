export const transformFieldSubmit = (property: string, data: any) => {
    switch (data.object?.[property]?.config.type) {
        case 'manual':
            return {
                mode: 0,
                manual: data.object[property].config.data
            };
        case 'cycle':
            return {
                mode: 3,
                cycle: data.object[property].config.data
            };
        case 'alarm':
            return {
                mode: 1,
                alarm: {
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
                }
            };
    };
}


export const transformFieldInit = (property: string, config: any) => {
    switch (config?.[property]?.mode) {
        case 0: // manual
            return {
                config: {
                    type: 'manual',
                    data: config?.[property]?.manual
                }
            };
        case 1: // alarm
            return {
                config: {
                    type: 'alarm',
                    data: {
                      begining:
                          config?.[property].alarm?.begining?.hour +
                          ':' +
                          config?.[property].alarm?.begining?.minute,
                      end:
                          config?.[property].alarm?.end?.hour +
                          ':' +
                          config?.[property].alarm?.end?.minute,
                    }
                }
            };
        case 3: // cycle
            return {
                config: {
                    type: 'cycle',
                    data: {
                        waitingTime: config?.[property].cycle?.waitingTime,
                        runningTime: config?.[property].cycle?.runningTime,
                    }
                }
            };
    }
};
