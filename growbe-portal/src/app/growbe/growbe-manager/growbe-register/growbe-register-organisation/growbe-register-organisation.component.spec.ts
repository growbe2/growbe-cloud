import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowbeRegisterOrganisationComponent } from './growbe-register-organisation.component';

describe('GrowbeRegisterOrganisationComponent', () => {
  let component: GrowbeRegisterOrganisationComponent;
  let fixture: ComponentFixture<GrowbeRegisterOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowbeRegisterOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeRegisterOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
