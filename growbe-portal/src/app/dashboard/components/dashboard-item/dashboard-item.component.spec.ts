import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FuseModule, FuseSharedModule, FuseWidgetModule } from '@berlingoqc/fuse';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { fuseConfig } from 'src/app/fuse/fuse-config';
import { DashboardService } from '../../dashboard.service';

import { DashboardItemComponent } from './dashboard-item.component';

describe('DashboardItemComponent', () => {
    let component: DashboardItemComponent;
    let fixture: ComponentFixture<DashboardItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardItemComponent],
            imports: [
              MatMenuModule,
              NoopAnimationsModule,

              RouterTestingModule,

                      FuseModule.forRoot(fuseConfig),


              FuseWidgetModule,
              FuseSharedModule,

              MatIconModule,
              MatButtonModule,

              AutoFormModule,
            ],
            providers: [
              {
                provide: DashboardService,
                useValue: {
                  getDashboards: () => of([]),
                  addPanelToDashboard: () => of([]),
                }
              }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
