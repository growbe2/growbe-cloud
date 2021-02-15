import { GrowbeMainboardConfig } from "@growbe2/growbe-pb";
import { Binding, BindingKey } from "@loopback/core";
import { DataSubject } from "./watcher/observers/model";


export namespace MQTTBindings {
    export const URL = BindingKey.create('mqtt.url')
}


export namespace GrowbeMainboardBindings {
    export const DEFAULT_CONFIG = BindingKey.create<Partial<GrowbeMainboardConfig>>('growbe.config');

    export const WATCHERS = BindingKey.create<DataSubject[]>('growbe.subject');
} 