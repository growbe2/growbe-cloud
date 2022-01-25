import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayBaseControlComponent } from './relay-base-control.component';

describe('RelayBaseControlComponent', () => {
  let component: RelayBaseControlComponent;
  let fixture: ComponentFixture<RelayBaseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelayBaseControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayBaseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
