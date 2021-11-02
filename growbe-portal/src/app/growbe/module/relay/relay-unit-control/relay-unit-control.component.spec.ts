import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayUnitControlComponent } from './relay-unit-control.component';

describe('RelayUnitControlComponent', () => {
  let component: RelayUnitControlComponent;
  let fixture: ComponentFixture<RelayUnitControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelayUnitControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayUnitControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
