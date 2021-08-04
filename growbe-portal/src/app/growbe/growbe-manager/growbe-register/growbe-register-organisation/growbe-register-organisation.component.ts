import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@berlingoqc/auth';
import { GrowbeRegisterResponse, GrowbeMainboard } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';

@Component({
    selector: 'app-growbe-register-organisation',
    templateUrl: './growbe-register-organisation.component.html',
    styleUrls: ['./growbe-register-organisation.component.scss'],
})
export class GrowbeRegisterOrganisationComponent implements OnInit {
    registrationForm = new FormGroup({
        id: new FormControl(undefined, [Validators.required]),
    });

    lastData: GrowbeRegisterResponse;

    mainboardsAvailable: Observable<GrowbeMainboard[]>;

    constructor(
      private activatedRoute: ActivatedRoute,
      private mainboardAPI: GrowbeMainboardAPI,
      private authService: AuthService,
    ) {}

    ngOnInit(): void {
      this.mainboardsAvailable = this.mainboardAPI.userGrowbeMainboard(this.authService.profile.id)
        .get({}).pipe(map(items => items.filter(i => !i.organisationId)) );
    }

    onFirstStep(stepper: MatStepper) {
        const orgId = this.activatedRoute.snapshot.params.id;
        this.mainboardAPI
            .registerOrganisation(this.registrationForm.value.id, orgId)
            .subscribe((data) => {
                if (
                    data.state === 'REGISTER_ORGANISATION'
                ) {
                    stepper.next();
                }
                this.lastData = data;
                this.registrationForm.controls.id.setErrors({
                    invalideState: data.state,
                });
            });
    }
}
