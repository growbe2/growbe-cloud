import { Component } from "@angular/core";
import { fuseAnimations } from "@berlingoqc/fuse";

@Component({
  template: `
  <login style="width: 100%">
        <fuse-widget
            [@animate]="{ value: '*', params: { y: '100%' } }"
            class="pb-0"
        >
    <router-outlet></router-outlet>
        </fuse-widget>

</login>
  `,
  animations: fuseAnimations,
})
export class GrowbeRegisterLayoutComponent {}
