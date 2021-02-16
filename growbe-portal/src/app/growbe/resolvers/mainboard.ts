import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GrowbeMainboardAPI } from "../api/growbe-mainboard";


@Injectable({ providedIn: 'root' })
export class GrowbeMainboardResolver implements Resolve<any> {
  constructor(private service: GrowbeMainboardAPI) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const id = route.params.id;
    const include = route.data.include;
    return this.service.getById(id, {
      include
    })
  }
}
