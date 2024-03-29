import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeTableComponent } from './growbe-table.component';

describe('GrowbeTableComponent', () => {
    let component: GrowbeTableComponent;
    let fixture: ComponentFixture<GrowbeTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            getTestModuleMetadata({
                data: {
                    imports: [MatDialogModule],
                    declarations: [GrowbeTableComponent],
                },
            }),
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowbeTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
