import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeManagerDetailComponent } from './growbe-manager-detail.component';

describe('GrowbeManagerDetailComponent', () => {
  let component: GrowbeManagerDetailComponent;
  let fixture: ComponentFixture<GrowbeManagerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeManagerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeManagerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
