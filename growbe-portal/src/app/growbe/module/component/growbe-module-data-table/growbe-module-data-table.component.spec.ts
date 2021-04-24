import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeModuleDataTableComponent } from './growbe-module-data-table.component';

describe('GrowbeModuleDataTableComponent', () => {
  let component: GrowbeModuleDataTableComponent;
  let fixture: ComponentFixture<GrowbeModuleDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeModuleDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeModuleDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
