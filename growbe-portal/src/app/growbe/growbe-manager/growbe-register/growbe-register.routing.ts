import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GrowbeRegisterLayoutComponent } from "src/app/growbe/growbe-manager/growbe-register/growbe-register-layout.component";
import { GrowbeRegisterOrganisationComponent } from "src/app/growbe/growbe-manager/growbe-register/growbe-register-organisation/growbe-register-organisation.component";
import { GrowbeRegisterComponent } from "src/app/growbe/growbe-manager/growbe-register/growbe-register/growbe-register.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GrowbeRegisterLayoutComponent,
        children: [
          {
            path: '',
            component: GrowbeRegisterComponent,
          },
          {
            path: 'org/:id',
            component: GrowbeRegisterOrganisationComponent,
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
  ],
})
export class GrowbeRegisterRouting {}
