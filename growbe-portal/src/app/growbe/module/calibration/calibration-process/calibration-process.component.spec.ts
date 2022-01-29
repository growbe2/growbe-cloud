import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationProcessComponent } from './calibration-process.component';

describe('CalibrationProcessComponent', () => {
  let component: CalibrationProcessComponent;
  let fixture: ComponentFixture<CalibrationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
