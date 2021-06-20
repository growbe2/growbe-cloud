import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeGroupingSelectFormComponent } from './timeframe-grouping-select-form.component';

describe('TimeframeGroupingSelectFormComponent', () => {
  let component: TimeframeGroupingSelectFormComponent;
  let fixture: ComponentFixture<TimeframeGroupingSelectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeframeGroupingSelectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeframeGroupingSelectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
