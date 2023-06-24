import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingComponent } from './seat-booking.component';

describe('SeatBookingComponent', () => {
  let component: SeatBookingComponent;
  let fixture: ComponentFixture<SeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
