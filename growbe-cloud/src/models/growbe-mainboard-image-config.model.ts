import {Entity, model, property} from '@loopback/repository';

@model()
export class FluentLog {
    @property()
    enable: boolean;
}

@model()
export class SSHRemoteAccess {
    @property()
    enable: boolean;

    @property()
    remoteAddr: string;
}


@model()
export class WifiConfiguration {
    @property()
    ssid: string;

    @property()
    password: string;

    @property()
    country: string;
}

@model({settings: {strict: false}})
export class GrowbeMainboardImageConfig extends Entity {

    @property()
    environment: string;

    @property()
    fluentLog?: FluentLog;

    @property()
    ssh?: SSHRemoteAccess;

    @property()
    wifi: WifiConfiguration;


  constructor(data?: Partial<GrowbeMainboardImageConfig>) {
    super(data);
  }
}

//export interface GrowbeMainboardImageConfigRelations {
  // describe navigational properties here
//}

//export type GrowbeMainboardImageConfigWithRelations = GrowbeMainboardImageConfig & GrowbeMainboardImageConfigRelations;
