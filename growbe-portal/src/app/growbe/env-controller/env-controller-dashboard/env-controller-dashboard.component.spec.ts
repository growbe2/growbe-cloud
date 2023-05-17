import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvControllerDashboardComponent } from './env-controller-dashboard.component';

describe('EnvControllerDashboardComponent', () => {
  let component: EnvControllerDashboardComponent;
  let fixture: ComponentFixture<EnvControllerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvControllerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvControllerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
