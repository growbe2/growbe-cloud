import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule, RoleGuard, AdminControlComponent } from '@berlingoqc/auth';

@NgModule({
    imports: [
        AuthModule,
        RouterModule.forChild([
            {
                path: '',
                // canActivate: [RoleGuard],
                component: AdminControlComponent,
                data: {
                    roles: ['ADMIN'],
                },
            },
        ]),
    ],
    exports: [],
})
export class UserManagingModule {}
