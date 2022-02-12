import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GrowbeEventService } from '../services/growbe-event.service';

@Injectable({
    providedIn: 'root',
})
export class MqttConnectGuard implements CanLoad, CanActivate {
    constructor(private growbeEventService: GrowbeEventService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.growbeEventService.connect().then(() => true);
  }

    async canLoad(
        route: Route,
        segments: UrlSegment[],
    ): Promise<boolean | UrlTree> {
        await this.growbeEventService.connect();
        return true;
    }
}
