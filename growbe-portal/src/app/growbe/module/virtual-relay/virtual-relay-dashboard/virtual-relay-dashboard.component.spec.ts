import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRelayDashboardComponent } from './virtual-relay-dashboard.component';

describe('VirtualRelayDashboardComponent', () => {
  let component: VirtualRelayDashboardComponent;
  let fixture: ComponentFixture<VirtualRelayDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualRelayDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualRelayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
