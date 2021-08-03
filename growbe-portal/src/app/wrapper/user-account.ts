import { NgModule } from '@angular/core';
import { UserAccountModule, UserAccountRoutingModule } from '@berlingoqc/auth';

@NgModule({
    imports: [UserAccountModule, UserAccountRoutingModule],
})
export class UserAccountWrapperModule {}
