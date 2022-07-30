import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { GrowbeRegisterResponse } from '@growbe2/ngx-cloud-api';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';

@Component({
    selector: 'app-growbe-register',
    templateUrl: './growbe-register.component.html',
    styleUrls: ['./growbe-register.component.scss'],
})
export class GrowbeRegisterComponent implements OnInit {

    registrationForm = new UntypedFormGroup({
      id: new UntypedFormControl(undefined, [Validators.required])
    });

    lastData: GrowbeRegisterResponse;

    constructor(
      private mainboardAPI: GrowbeMainboardAPI,
    ) {}

    ngOnInit(): void {}

    onFirstStep(stepper: MatStepper) {
        this.mainboardAPI.register(this.registrationForm.value.id)
          .subscribe((data) => {
            if (data.state === 'REGISTER' || data.state === 'UNBEATH_REGISTER') {
              stepper.next();
            }
            this.lastData = data;
            this.registrationForm.controls.id.setErrors({
              invalideState: data.state
            })
          });
    }
}
