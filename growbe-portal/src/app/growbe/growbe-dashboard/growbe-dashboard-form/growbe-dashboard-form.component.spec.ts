import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeDashboardFormComponent } from './growbe-dashboard-form.component';

describe('GrowbeDashboardFormComponent', () => {
  let component: GrowbeDashboardFormComponent;
  let fixture: ComponentFixture<GrowbeDashboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeDashboardFormComponent ]
    })
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
