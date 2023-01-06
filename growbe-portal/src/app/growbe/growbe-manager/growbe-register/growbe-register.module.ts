import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatStepperModule } from "@angular/material/stepper";
import { RouterModule } from "@angular/router";
import { OrganisationModule } from "@berlingoqc/auth";
import { FuseWidgetModule } from "@berlingoqc/fuse";
import { LoginModule, PageLayoutModule } from "@berlingoqc/fuse-extra";
import { GrowbeRegisterLayoutComponent } from "src/app/growbe/growbe-manager/growbe-register/growbe-register-layout.component";
import { GrowbeRegisterRouting } from "src/app/growbe/growbe-manager/growbe-register/growbe-register.routing";
import { GrowbeRegisterComponent } from "src/app/growbe/growbe-manager/growbe-register/growbe-register/growbe-register.component";
import { GrowbeRegisterOrganisationComponent } from './growbe-register-organisation/growbe-register-organisation.component';
import { GrowbeImageConfigComponent } from './growbe-image-config/growbe-image-config.component';



@NgModule({
  imports: [
    CommonModule,
    GrowbeRegisterRouting,
    PageLayoutModule,
    FuseWidgetModule,
    LoginModule,
    MatStepperModule,

    OrganisationModule,

    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [],
  declarations: [
    GrowbeRegisterOrganisationComponent,
    GrowbeRegisterComponent,
    GrowbeRegisterLayoutComponent,
    GrowbeImageConfigComponent
  ]
})
export class GrowbeRegisterModule {}
