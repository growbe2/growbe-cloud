import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeModuleConfigComponent } from './growbe-module-config.component';

describe('GrowbeModuleConfigComponent', () => {
    let component: GrowbeModuleConfigComponent;
    let fixture: ComponentFixture<GrowbeModuleConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            getTestModuleMetadata({
                data: {
                    declarations: [GrowbeModuleConfigComponent],
                },
            }),
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowbeModuleConfigComponent);
        component = fixture.componentInstance;
        component.moduleName  = '';
        component.moduleId = '';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
