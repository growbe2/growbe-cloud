import { BindingScope, inject, injectable, service } from "@loopback/core";
import {NMSBindings} from "../component";
import {ReverseProxyBindings} from "../keys";

export interface GrowbeCloudFeature {
  name: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeFeatureService {
	constructor(
    @inject(ReverseProxyBindings.URL)
    private reverseProxyUrl: String,

    @inject(NMSBindings.NMS_URL)
    private nmsUrl: String,
	) {}

  get hasReverseProxy(): boolean {
    return this.reverseProxyUrl && this.reverseProxyUrl != "";
  }

  get hasNMS(): boolean {
    return this.nmsUrl && this.nmsUrl != "";
  }


  getFeatures(): GrowbeCloudFeature[] {
    const items: GrowbeCloudFeature[] = [];

    if (this.hasNMS) { items.push({name: 'nms'})};
    if (this.hasReverseProxy) { items.push({name: 'reverse_proxy'})}


    return items;
  }

}


