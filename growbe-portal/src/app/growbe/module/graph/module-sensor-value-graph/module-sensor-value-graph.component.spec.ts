import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { ModuleSensorValueGraphComponent } from './module-sensor-value-graph.component';

describe('ModuleSensorValueGraphComponent', () => {
  let component: ModuleSensorValueGraphComponent;
  let fixture: ComponentFixture<ModuleSensorValueGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data: {
      declarations: [ ModuleSensorValueGraphComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSensorValueGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
