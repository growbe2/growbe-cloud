import { NgModule } from '@angular/core';
import { OrganisationModule, OrganisationRouting } from '@berlingoqc/auth';

@NgModule({
    imports: [OrganisationRouting, OrganisationModule],
})
export class OrganisationWrapperModule {}
