import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { GrowbeDashboardWithRelations } from "@growbe2/ngx-cloud-api";
import { Observable } from "rxjs";

import { GrowbeDashboardAPI } from '../api/growbe-dashboard';

@Injectable({ providedIn: 'root' })
export class GrowbeDashboardResolver implements Resolve<GrowbeDashboardWithRelations> {
  constructor(private service: GrowbeDashboardAPI) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const id = route.params.id;
    const include = route.data.include;
    return this.service.getById(id, {
      include
    }).toPromise();
  }
}
