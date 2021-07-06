import { ActionResponse } from '@growbe2/growbe-pb';
import { BindingScope, injectable } from "@loopback/context";
import { Observable, of, Subject, timer, throwError } from "rxjs";
import { filter, finalize, map, mergeMap, switchMap, tap, timeout } from 'rxjs/operators';

export interface WaitResponseOptions {
    responseCode: number;
    waitingTime: number;
    retry?: number;
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
          tap(console.log),
          filter(x => x.id === id),
          tap(console.log),
          switchMap(x => (x.action.status < 400) ? of(x.action): throwError(x.action)),
          filter(item => item.action === options.responseCode),
          timeout(options.waitingTime),
      );
  }


}