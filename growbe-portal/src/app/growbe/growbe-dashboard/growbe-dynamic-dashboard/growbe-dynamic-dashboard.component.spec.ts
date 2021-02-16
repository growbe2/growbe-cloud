import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeDynamicDashboardComponent } from './growbe-dynamic-dashboard.component';

describe('GrowbeDynamicDashboardComponent', () => {
  let component: GrowbeDynamicDashboardComponent;
  let fixture: ComponentFixture<GrowbeDynamicDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeDynamicDashboardComponent ]
    })
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
