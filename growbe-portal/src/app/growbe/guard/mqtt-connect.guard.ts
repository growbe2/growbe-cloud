import { Injectable } from '@angular/core';
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
export class MqttConnectGuard implements CanLoad {
    constructor(private growbeEventService: GrowbeEventService) {}

    async canLoad(
        route: Route,
        segments: UrlSegment[],
    ): Promise<boolean | UrlTree> {
        await this.growbeEventService.connect();
        return true;
    }
}
