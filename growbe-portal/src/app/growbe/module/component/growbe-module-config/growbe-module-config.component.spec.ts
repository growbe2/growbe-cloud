import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleConfigComponent } from './growbe-module-config.component';

describe('GrowbeModuleConfigComponent', () => {
  let component: GrowbeModuleConfigComponent;
  let fixture: ComponentFixture<GrowbeModuleConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModuleConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModuleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
