import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteryStoreComponent } from './registery-store.component';

describe('RegisteryStoreComponent', () => {
  let component: RegisteryStoreComponent;
  let fixture: ComponentFixture<RegisteryStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteryStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteryStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
