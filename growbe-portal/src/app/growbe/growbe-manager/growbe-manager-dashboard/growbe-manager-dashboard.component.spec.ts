import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeManagerDashboardComponent } from './growbe-manager-dashboard.component';

describe('GrowbeManagerDashboardComponent', () => {
  let component: GrowbeManagerDashboardComponent;
  let fixture: ComponentFixture<GrowbeManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeManagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
