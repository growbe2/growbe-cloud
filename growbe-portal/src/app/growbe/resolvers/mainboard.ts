import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { GrowbeMainboardWithRelations } from "@growbe2/ngx-cloud-api";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { GrowbeMainboardAPI } from "../api/growbe-mainboard";


@Injectable({ providedIn: 'root' })
export class GrowbeMainboardResolver implements Resolve<GrowbeMainboardWithRelations> {
  constructor(private service: GrowbeMainboardAPI) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const id = route.params.id;
    const include = route.data.include;
    return this.service.getById(id, {
      include
    }).pipe(take(1)).toPromise();
  }
}
