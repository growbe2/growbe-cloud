import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRelayControlComponent } from './virtual-relay-control.component';

describe('VirtualRelayControlComponent', () => {
  let component: VirtualRelayControlComponent;
  let fixture: ComponentFixture<VirtualRelayControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualRelayControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualRelayControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
