import {BindingScope, inject, injectable} from "@loopback/core";
import {ReverseProxyBindings} from "../keys";
import {WaitResponseOptions} from "./growbe-response.service";

import { from } from 'rxjs';
import axios from 'axios';
import pb, {ActionResponse} from '@growbe2/growbe-pb';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeReverseProxyService {

  private get basePath(): string {
    return `${this.url}/mainboard`;
  }

  constructor(
    @inject(ReverseProxyBindings.URL)
    private url: string,
  ) {}


  sendWithResponse(mainboardId: string, topic: string, body: any, options: WaitResponseOptions, responseTopic?: string) {
    const path = `${this.basePath}/${mainboardId}/cmd`;
    const payload = new pb.GrowbeCommand({ topic, payload: body});
    const data = pb.GrowbeCommand.encode(payload).finish();
    return from(axios.post(path, data, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }).then(response => response.data as ActionResponse));
  }
}

