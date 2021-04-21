import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeDashboardHomeComponent } from './growbe-dashboard-home.component';

describe('GrowbeDashboardHomeComponent', () => {
  let component: GrowbeDashboardHomeComponent;
  let fixture: ComponentFixture<GrowbeDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data:{
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [ GrowbeDashboardHomeComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
