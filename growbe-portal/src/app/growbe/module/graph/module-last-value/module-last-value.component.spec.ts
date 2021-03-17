import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLastValueComponent } from './module-last-value.component';

describe('ModuleLastValueComponent', () => {
  let component: ModuleLastValueComponent;
  let fixture: ComponentFixture<ModuleLastValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleLastValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLastValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
