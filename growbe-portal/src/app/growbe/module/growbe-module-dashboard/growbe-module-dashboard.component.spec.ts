import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleDashboardComponent } from './growbe-module-dashboard.component';

xdescribe('GrowbeModuleDashboardComponent', () => {
    let component: GrowbeModuleDashboardComponent;
    let fixture: ComponentFixture<GrowbeModuleDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GrowbeModuleDashboardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowbeModuleDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
