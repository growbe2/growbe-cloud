import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteryItemComponent } from './registery-item.component';

describe('RegisteryItemComponent', () => {
  let component: RegisteryItemComponent;
  let fixture: ComponentFixture<RegisteryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
