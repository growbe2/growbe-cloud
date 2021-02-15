import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetModuleGraphComponent } from './widget-module-graph.component';

describe('WidgetModuleGraphComponent', () => {
  let component: WidgetModuleGraphComponent;
  let fixture: ComponentFixture<WidgetModuleGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetModuleGraphComponent ]
    })
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
