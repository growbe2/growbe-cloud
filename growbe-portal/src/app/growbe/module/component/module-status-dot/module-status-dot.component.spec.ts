import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { ModuleStatusDotComponent } from './module-status-dot.component';

describe('ModuleStatusDotComponent', () => {
    let component: ModuleStatusDotComponent;
    let fixture: ComponentFixture<ModuleStatusDotComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            getTestModuleMetadata({
                data: {
                    declarations: [ModuleStatusDotComponent],
                },
            }),
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModuleStatusDotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
