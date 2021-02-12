import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeStatusDotComponent } from './growbe-status-dot.component';

describe('GrowbeStatusDotComponent', () => {
  let component: GrowbeStatusDotComponent;
  let fixture: ComponentFixture<GrowbeStatusDotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeStatusDotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeStatusDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
