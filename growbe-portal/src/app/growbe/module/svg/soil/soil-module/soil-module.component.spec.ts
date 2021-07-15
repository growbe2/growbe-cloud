import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilModuleComponent } from './soil-module.component';

describe('SoilModuleComponent', () => {
  let component: SoilModuleComponent;
  let fixture: ComponentFixture<SoilModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoilModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
