import { FormObject, UnionProperty } from "@berlingoqc/ngx-autoform";
import { timeFieldComponent } from "../graph/service/growbe-graph.service";

export const getCyclePropertie = () => {
    return {
                name: 'cycle',
                type: 'object',
                properties: [
                    {
                        type: 'number',
                        name: 'waitingTime',
                        required: true,
                        displayName: 'Waiting Time (seconds)',
                    },
                    {
                        type: 'number',
                        name: 'runningTime',
                        required: true,
                        displayName: 'Running Time (seconds)',
                    }
                ]
            } as FormObject;
}

export const getAlarmPropertie = () => {
    return {
                name: 'alarm',
                type: 'object',
                properties: [
                    {
                        type: 'string',
                        name: 'begining',
                        displayName: 'Opening time',
                        required: true,
                        component: timeFieldComponent,
                    },
                    {
                        type: 'string',
                        name: 'end',
                        displayName: 'Closing time',
                        required: true,
                        component: timeFieldComponent,
                    },
                ],
            } as FormObject;
}

export const getFormPropertieRelay = () => {

    return [{
        type: 'union',
        name: 'config',
        types: {
            manual: {
                name: 'manual',
                type: 'object',
                decorators: {
                    class: []
                },
                properties: [
                    {
                        type: 'bool',
                        name: 'state',
                        component: {
                            name: 'checkbox',
                        },
                    },
                    {
                        type: 'number',
                        name: 'duration',
                    }
                ],
            },
            cycle: getCyclePropertie(),
            alarm: getAlarmPropertie(),
        },
    } as UnionProperty];
}

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

export function transformRelayTimeToString(relay_time: {hour: number, minute: number}) {
    if (!relay_time) { return ""; }
    if (relay_time.hour == undefined) { relay_time.hour = 0; }
    if (relay_time.minute == undefined) { relay_time.minute = 0; }
    const hour_str = relay_time.hour + "";
    const minute_str = relay_time.minute + "";
    return ((hour_str.length == 1) ? '0' + hour_str : hour_str) + ':' + ((minute_str.length === 1) ? '0' + minute_str : minute_str);
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
