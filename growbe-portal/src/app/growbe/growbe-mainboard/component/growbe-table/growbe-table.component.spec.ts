import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeTableComponent } from './growbe-table.component';

describe('GrowbeTableComponent', () => {
  let component: GrowbeTableComponent;
  let fixture: ComponentFixture<GrowbeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
