import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeModuleDataTableComponent } from './growbe-module-data-table.component';

describe('GrowbeModuleDataTableComponent', () => {
    let component: GrowbeModuleDataTableComponent;
    let fixture: ComponentFixture<GrowbeModuleDataTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            getTestModuleMetadata({
                data: {
                    declarations: [GrowbeModuleDataTableComponent],
                },
            }),
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowbeModuleDataTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
