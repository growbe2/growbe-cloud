import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdatedValueComponent } from './outdated-value.component';

describe('OutdatedValueComponent', () => {
  let component: OutdatedValueComponent;
  let fixture: ComponentFixture<OutdatedValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutdatedValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdatedValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
