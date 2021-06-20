import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGraphBuilderComponent } from './module-graph-builder.component';

describe('ModuleGraphBuilderComponent', () => {
  let component: ModuleGraphBuilderComponent;
  let fixture: ComponentFixture<ModuleGraphBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleGraphBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGraphBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
