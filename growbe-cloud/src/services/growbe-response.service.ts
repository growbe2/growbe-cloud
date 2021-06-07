import { throwError } from '@berlingoqc/sso';
import { ActionResponse } from '@growbe2/growbe-pb';
import { BindingScope, injectable } from "@loopback/context";
import { Observable, Subject, timer } from "rxjs";
import { filter, finalize, mergeMap, timeout } from 'rxjs/operators';

export interface WaitResponseOptions {
    responseCode: number;
    waitingTime: number;
}

export const genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
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
          `Attempt ${retryAttempt}: retrying in ${retryAttempt *
            scalingDuration}ms`
        );
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('We are done!'))
    );
  };

@injectable({scope: BindingScope.SINGLETON})
export class GrowbeActionReponseService {

  private actionReponse: Subject<ActionResponse>;

  constructor() {
      this.actionReponse = new Subject<ActionResponse>();
  }


  async receiveActionResponse(response: ActionResponse): Promise<void> {
      this.actionReponse.next(response);
  }

  waitForResponse(options: WaitResponseOptions): Observable<ActionResponse> {
      return this.actionReponse.asObservable().pipe(
          filter(item => item.responseCode === options.responseCode),
          timeout(options.waitingTime)
      );
  }


}