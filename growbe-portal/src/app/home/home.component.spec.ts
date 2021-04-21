import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AuthModule} from '@berlingoqc/auth';
import { getTestModuleMetadata } from '../_spec/test.module.spec';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data: {
      imports: [
        AuthModule.forRoot(),
      ],
      declarations: [ HomeComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
