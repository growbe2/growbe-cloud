import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeLocalConnectionComponent } from './growbe-local-connection.component';

describe('GrowbeLocalConnectionComponent', () => {
  let component: GrowbeLocalConnectionComponent;
  let fixture: ComponentFixture<GrowbeLocalConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeLocalConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeLocalConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
