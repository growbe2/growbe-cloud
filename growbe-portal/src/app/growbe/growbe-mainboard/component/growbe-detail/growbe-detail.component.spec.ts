import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeDetailComponent } from './growbe-detail.component';

describe('GrowbeDetailComponent', () => {
  let component: GrowbeDetailComponent;
  let fixture: ComponentFixture<GrowbeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
