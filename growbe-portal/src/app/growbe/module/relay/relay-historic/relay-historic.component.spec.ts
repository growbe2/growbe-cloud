import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayHistoricComponent } from './relay-historic.component';

describe('RelayHistoricComponent', () => {
  let component: RelayHistoricComponent;
  let fixture: ComponentFixture<RelayHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelayHistoricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelayHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
