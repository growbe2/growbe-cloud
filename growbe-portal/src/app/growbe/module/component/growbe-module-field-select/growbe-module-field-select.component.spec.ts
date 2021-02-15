import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleFieldSelectComponent } from './growbe-module-field-select.component';

describe('GrowbeModuleFieldSelectComponent', () => {
  let component: GrowbeModuleFieldSelectComponent;
  let fixture: ComponentFixture<GrowbeModuleFieldSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModuleFieldSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModuleFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
