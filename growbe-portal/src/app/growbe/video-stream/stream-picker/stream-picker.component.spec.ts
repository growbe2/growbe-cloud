import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPickerComponent } from './stream-picker.component';

describe('StreamPickerComponent', () => {
  let component: StreamPickerComponent;
  let fixture: ComponentFixture<StreamPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
