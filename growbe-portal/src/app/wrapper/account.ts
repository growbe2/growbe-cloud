import { NgModule } from '@angular/core';
import { AccountRoutingModule, AuthModule } from '@berlingoqc/auth'

@NgModule({
  imports: [AuthModule, AccountRoutingModule]
})
export class AuthWrapperModule { }

