import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { StreamPlayerComponent } from './stream-player.component';

describe('StreamPlayerComponent', () => {
  let component: StreamPlayerComponent;
  let fixture: ComponentFixture<StreamPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data: {
      declarations: [ StreamPlayerComponent ]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
