import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  get url(): string {
    return `${envConfig.growbeCloud}/preferences`;
  }

  preference$ = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get() {
    return this.httpClient.get<any>(`${this.url}`).pipe(
      tap((pref) => this.preference$.next(pref))
    );
  }

  update(preference) {
    return this.httpClient.patch<any>(`${this.url}`, preference).pipe(
      tap(() => this.preference$.next(preference))
    );
  }
}
