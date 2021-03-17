import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { GrowbeDashboardAPI } from '../api/growbe-dashboard';

@Injectable({ providedIn: 'root' })
export class GrowbeDashboardResolver implements Resolve<any> {
  constructor(private service: GrowbeDashboardAPI) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const id = route.params.id;
    const include = route.data.include;
    return this.service.getById(id, {
      include
    }).toPromise();
  }
}
