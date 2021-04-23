import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GraphSearchBarComponent } from './graph-search-bar.component';

describe('GraphSearchBarComponent', () => {
    let component: GraphSearchBarComponent;
    let fixture: ComponentFixture<GraphSearchBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            getTestModuleMetadata({
                data: {
                    declarations: [GraphSearchBarComponent],
                },
            }),
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GraphSearchBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
