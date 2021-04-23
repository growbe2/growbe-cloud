import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeDashboardItemFormComponent } from './growbe-dashboard-item-form.component';

describe('GrowbeDashboardItemFormComponent', () => {
    let component: GrowbeDashboardItemFormComponent;
    let fixture: ComponentFixture<GrowbeDashboardItemFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            getTestModuleMetadata({
                data: {
                    imports: [NoopAnimationsModule],
                    declarations: [GrowbeDashboardItemFormComponent],
                },
            }),
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowbeDashboardItemFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
