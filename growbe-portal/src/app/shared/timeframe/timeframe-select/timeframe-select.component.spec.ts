import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeSelectComponent } from './timeframe-select.component';

describe('TimeframeSelectComponent', () => {
  let component: TimeframeSelectComponent;
  let fixture: ComponentFixture<TimeframeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeframeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeframeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
