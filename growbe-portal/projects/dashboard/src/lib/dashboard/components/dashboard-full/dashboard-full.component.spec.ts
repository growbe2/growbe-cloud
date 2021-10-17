import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFullComponent } from './dashboard-full.component';

describe('DashboardFullComponent', () => {
  let component: DashboardFullComponent;
  let fixture: ComponentFixture<DashboardFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
