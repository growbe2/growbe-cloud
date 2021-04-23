import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AuthModule} from '@berlingoqc/auth';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeDashboardFormComponent } from './growbe-dashboard-form.component';

describe('GrowbeDashboardFormComponent', () => {
  let component: GrowbeDashboardFormComponent;
  let fixture: ComponentFixture<GrowbeDashboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data: {
      imports: [ AuthModule.forRoot() ],
      declarations: [ GrowbeDashboardFormComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
