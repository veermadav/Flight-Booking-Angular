import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAircraftsComponent } from './add-aircrafts.component';

describe('AddAircraftsComponent', () => {
  let component: AddAircraftsComponent;
  let fixture: ComponentFixture<AddAircraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAircraftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAircraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
