import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleDefComponent } from './growbe-module-def.component';

describe('GrowbeModuleDefComponent', () => {
  let component: GrowbeModuleDefComponent;
  let fixture: ComponentFixture<GrowbeModuleDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModuleDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModuleDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
