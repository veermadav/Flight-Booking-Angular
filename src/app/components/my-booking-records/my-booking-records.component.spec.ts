import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingRecordsComponent } from './my-booking-records.component';

describe('MyBookingRecordsComponent', () => {
  let component: MyBookingRecordsComponent;
  let fixture: ComponentFixture<MyBookingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBookingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
