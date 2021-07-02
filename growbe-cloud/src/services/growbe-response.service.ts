import { throwError } from '@berlingoqc/sso';
import { ActionResponse } from '@growbe2/growbe-pb';
import { BindingScope, injectable } from "@loopback/context";
import { Observable, Subject, timer } from "rxjs";
import { filter, finalize, map, mergeMap, switchAll, switchMap, timeout } from 'rxjs/operators';

export interface WaitResponseOptions {
    responseCode: number;
    waitingTime: number;
}

export const genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 2000,
  }: {
    maxRetryAttempts?: number,
    scalingDuration?: number,
  } = {}) => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i): any => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (
          retryAttempt > maxRetryAttempts
        ) {
          return throwError(error);
        }
        console.log(
          `Attempt ${retryAttempt}: retrying in ${1 *
            scalingDuration}ms`
        );
        // retry after 1s, 2s, etc...
        return timer(1 * scalingDuration);
      }),
      finalize(() => console.log('We are done!'))
    );
  };

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