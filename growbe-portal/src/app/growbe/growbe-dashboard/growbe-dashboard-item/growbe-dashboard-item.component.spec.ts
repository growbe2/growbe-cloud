import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { GrowbeDashboardItemComponent } from './growbe-dashboard-item.component';

describe('GrowbeDashboardItemComponent', () => {
  let component: GrowbeDashboardItemComponent;
  let fixture: ComponentFixture<GrowbeDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getTestModuleMetadata({data:{
      declarations: [ GrowbeDashboardItemComponent ],
      imports: [MatMenuModule]
    }}))
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowbeDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
