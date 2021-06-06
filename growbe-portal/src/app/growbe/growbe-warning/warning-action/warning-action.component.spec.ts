import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningActionComponent } from './warning-action.component';

describe('WarningActionComponent', () => {
    let component: WarningActionComponent;
    let fixture: ComponentFixture<WarningActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WarningActionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WarningActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
