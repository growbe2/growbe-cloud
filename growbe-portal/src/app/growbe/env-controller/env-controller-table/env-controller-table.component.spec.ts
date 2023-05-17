import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvControllerTableComponent } from './env-controller-table.component';

describe('EnvControllerTableComponent', () => {
  let component: EnvControllerTableComponent;
  let fixture: ComponentFixture<EnvControllerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvControllerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvControllerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
