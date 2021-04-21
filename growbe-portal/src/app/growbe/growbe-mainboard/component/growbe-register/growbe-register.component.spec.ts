import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeRegisterComponent } from './growbe-register.component';

describe('GrowbeRegisterComponent', () => {
  let component: GrowbeRegisterComponent;
  let fixture: ComponentFixture<GrowbeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data:{
      declarations: [ GrowbeRegisterComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
