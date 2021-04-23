import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeDynamicDashboardComponent } from './growbe-dynamic-dashboard.component';

describe('GrowbeDynamicDashboardComponent', () => {
  let component: GrowbeDynamicDashboardComponent;
  let fixture: ComponentFixture<GrowbeDynamicDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data: {
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [ GrowbeDynamicDashboardComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDynamicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
