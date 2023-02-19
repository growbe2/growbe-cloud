import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BaseAPI} from './base.api';

@Injectable({providedIn: 'root'})
export class RelayHistoricAPI extends BaseAPI {
  getRelayHistoric(
    moduleId: string,
    property: string,
    since?: number,
  ): Observable<{state: boolean, timestamp: number}[]> {
    return this.httpClient.get<{state: boolean, timestamp: number}[]>(
      `${this.url}/growbeModules/${moduleId}/relay/${property}/historic${since ? `?since=${since}`: ''}`
    );
  }
}
