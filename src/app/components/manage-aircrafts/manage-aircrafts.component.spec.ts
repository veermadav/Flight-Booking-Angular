import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAircraftsComponent } from './manage-aircrafts.component';

describe('ManageAircraftsComponent', () => {
  let component: ManageAircraftsComponent;
  let fixture: ComponentFixture<ManageAircraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAircraftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAircraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
