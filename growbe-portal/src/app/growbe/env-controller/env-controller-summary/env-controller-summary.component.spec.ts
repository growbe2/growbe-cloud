import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvControllerSummaryComponent } from './env-controller-summary.component';

describe('EnvControllerSummaryComponent', () => {
  let component: EnvControllerSummaryComponent;
  let fixture: ComponentFixture<EnvControllerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvControllerSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvControllerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
