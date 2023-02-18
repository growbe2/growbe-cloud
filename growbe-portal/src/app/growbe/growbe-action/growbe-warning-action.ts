import { growbeSyncForm } from 'src/app/growbe/growbe-action/forms/sync.form';
import { growbeRtcForm } from './forms';

const defaultConfig = (name: string) => {
    return {
        displayData: name,
        formFunc: growbeSyncForm,
        formFuncTransform: () => ({}),
    }
}
/**
 * Map with the configuration on how to handle the configuration
 */
export const growbeActions = {
    RTC_OFFSET: {
        displayData: {
            type: 'func',
            content: (data: any) => `RTC is ${data.data.state}`,
        },
        formFunc: growbeRtcForm,
        formFuncTransform: (dataForm: any) => {
            const timeItem = dataForm.object.hour.split(':');
            const date = dataForm.object.date as Date;
            return {
                second: 0,
                minute: +timeItem[1],
                hour: +timeItem[0],
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            };
        },
    },
    DESYNC: defaultConfig("Sync"),
    LOCAL_CONNECTION: defaultConfig("Local Connection"),
    HELLO_WORLD: defaultConfig("Hello World"),
    RESTART: defaultConfig("Restart"),
    REBOOT: defaultConfig("Reboot"),
    RESTART_COMBOARD: defaultConfig("Restart Comboard"),
};
