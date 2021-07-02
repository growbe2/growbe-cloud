import { throwError } from '@berlingoqc/sso';
import { ActionResponse } from '@growbe2/growbe-pb';
import { BindingScope, injectable } from "@loopback/context";
import { Observable, Subject, timer } from "rxjs";
import { filter, finalize, map, mergeMap, switchAll, switchMap, timeout } from 'rxjs/operators';


export interface WaitRetryOption {
    waitingTime: number;
    retry?: number;
}
export interface WaitResponseOptions extends WaitRetryOption {
    responseCode: number;
}

@injectable({scope: BindingScope.SINGLETON})
export class GrowbeActionReponseService {

  private actionReponse: Subject<{ id: string; action: ActionResponse}>;

  constructor() {
      this.actionReponse = new Subject<{ id: string; action: ActionResponse}>();
  }

  async receiveActionResponse(id: string, response: ActionResponse): Promise<void> {
      this.actionReponse.next({ id, action: response});
  }

  waitForResponse(id: string, options: WaitResponseOptions): Observable<ActionResponse> {
      return this.actionReponse.asObservable().pipe(
          filter(x => x.id === id),
          map(x => {
            return x.action;
          }),
          filter(item => item.action === options.responseCode),
          timeout(options.waitingTime)
      );
  }


}