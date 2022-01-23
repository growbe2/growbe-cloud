import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRelayTableComponent } from './virtual-relay-table.component';

describe('VirtualRelayTableComponent', () => {
  let component: VirtualRelayTableComponent;
  let fixture: ComponentFixture<VirtualRelayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualRelayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualRelayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
