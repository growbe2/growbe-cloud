import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeClockStateComponent } from './growbe-state.component';

describe('GrowbeClockStateComponent', () => {
  let component: GrowbeClockStateComponent;
  let fixture: ComponentFixture<GrowbeClockStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeClockStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeClockStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
