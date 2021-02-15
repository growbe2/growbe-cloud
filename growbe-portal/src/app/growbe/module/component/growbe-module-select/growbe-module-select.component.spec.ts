import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleSelectComponent } from './growbe-module-select.component';

describe('GrowbeModuleSelectComponent', () => {
  let component: GrowbeModuleSelectComponent;
  let fixture: ComponentFixture<GrowbeModuleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModuleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModuleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
