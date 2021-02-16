import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeDashboardItemFormComponent } from './growbe-dashboard-item-form.component';

describe('GrowbeDashboardItemFormComponent', () => {
  let component: GrowbeDashboardItemFormComponent;
  let fixture: ComponentFixture<GrowbeDashboardItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeDashboardItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDashboardItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
