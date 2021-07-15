import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilProbeComponent } from './soil-probe.component';

describe('SoilProbeComponent', () => {
  let component: SoilProbeComponent;
  let fixture: ComponentFixture<SoilProbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoilProbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilProbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
