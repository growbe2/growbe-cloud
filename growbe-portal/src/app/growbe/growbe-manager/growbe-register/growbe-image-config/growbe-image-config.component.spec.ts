import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeImageConfigComponent } from './growbe-image-config.component';

describe('GrowbeImageConfigComponent', () => {
  let component: GrowbeImageConfigComponent;
  let fixture: ComponentFixture<GrowbeImageConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeImageConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeImageConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
