import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeDashboardItemComponent } from './growbe-dashboard-item.component';

describe('GrowbeDashboardItemComponent', () => {
  let component: GrowbeDashboardItemComponent;
  let fixture: ComponentFixture<GrowbeDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeDashboardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
