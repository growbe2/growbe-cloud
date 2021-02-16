import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeDashboardHomeComponent } from './growbe-dashboard-home.component';

describe('GrowbeDashboardHomeComponent', () => {
  let component: GrowbeDashboardHomeComponent;
  let fixture: ComponentFixture<GrowbeDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeDashboardHomeComponent ]
    })
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
