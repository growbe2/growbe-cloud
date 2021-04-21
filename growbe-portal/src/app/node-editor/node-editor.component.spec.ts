import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from '../_spec/test.module.spec';

import { NodeEditorComponent } from './node-editor.component';

describe('NodeEditorComponent', () => {
  let component: NodeEditorComponent;
  let fixture: ComponentFixture<NodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data: {
      declarations: [ NodeEditorComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
