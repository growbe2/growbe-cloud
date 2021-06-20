import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModulePropertiesSelectFormComponent } from './growbe-module-properties-select-form.component';

describe('GrowbeModulePropertiesSelectFormComponent', () => {
  let component: GrowbeModulePropertiesSelectFormComponent;
  let fixture: ComponentFixture<GrowbeModulePropertiesSelectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModulePropertiesSelectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModulePropertiesSelectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
