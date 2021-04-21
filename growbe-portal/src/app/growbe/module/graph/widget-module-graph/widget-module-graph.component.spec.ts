import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { WidgetModuleGraphComponent } from './widget-module-graph.component';

describe('WidgetModuleGraphComponent', () => {
  let component: WidgetModuleGraphComponent;
  let fixture: ComponentFixture<WidgetModuleGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data:{
      imports: [ NoopAnimationsModule ],
      declarations: [ WidgetModuleGraphComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetModuleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
