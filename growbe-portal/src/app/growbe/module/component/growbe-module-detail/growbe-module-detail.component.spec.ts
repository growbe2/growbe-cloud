import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleDetailComponent } from './growbe-module-detail.component';

describe('GrowbeModuleDetailComponent', () => {
  let component: GrowbeModuleDetailComponent;
  let fixture: ComponentFixture<GrowbeModuleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModuleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModuleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
