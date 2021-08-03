import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { fuseAnimations, FuseConfigService } from "@berlingoqc/fuse";
import { unsubscriber } from "@berlingoqc/ngx-common";
import { Subscriber, Subscription } from "rxjs";
import { filter } from "rxjs/operators";



@Component({
  selector: '',
  template: `
<login-2 style="width: 100%">
    <fuseLayoutHeader>
        <fuse-widget
            [@animate]="{ value: '*', params: { y: '100%' } }"
            class="pb-0"
        >
            <div class="fuse-widget-front welcome-card">
                <h1>Growbe Cloud</h1>
                <span class="filler"></span>
            </div>
        </fuse-widget>
    </fuseLayoutHeader>

    <router-outlet></router-outlet>

</login-2>
  `,
  animations: fuseAnimations,
})
@unsubscriber
export class AuthComponent {

  sub: Subscription;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private router: Router
  ) {

    this.sub = router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe(() => {
            this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
