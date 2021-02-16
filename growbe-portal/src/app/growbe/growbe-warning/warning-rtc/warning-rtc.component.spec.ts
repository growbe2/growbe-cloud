import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningRtcComponent } from './warning-rtc.component';

describe('WarningRtcComponent', () => {
  let component: WarningRtcComponent;
  let fixture: ComponentFixture<WarningRtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningRtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningRtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
