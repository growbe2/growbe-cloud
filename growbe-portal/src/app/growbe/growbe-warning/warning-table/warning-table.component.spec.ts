import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningTableComponent } from './warning-table.component';

describe('WarningTableComponent', () => {
  let component: WarningTableComponent;
  let fixture: ComponentFixture<WarningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
