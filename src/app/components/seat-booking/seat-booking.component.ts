import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {
  rows: number = 10;
  seatsPerRow: number = 6;
  seats: string[][] = [];
  bookedData: any[] = [];
  aircraftObj:any;
  aircraftNumber:any;
  userName:any;
  flightCode:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userStore: UserStoreService,
    private auth: AuthService,
    private route: ActivatedRoute
   
  ) {}
  ngOnInit() {
    this.generateSeats();
    const aircraftObj = localStorage.getItem('AllocationObj');
    this.aircraftObj = aircraftObj !== null ? JSON.parse(aircraftObj) : this.auth.aircraftObj;
    console.log( this.aircraftObj,"airObj");
    if(this.aircraftObj){
    this.flightCode =  this.aircraftObj.aircraftCode;
   console.log(this.flightCode);
    if(this.flightCode){
    this.auth.getSeatDetails(this.flightCode).subscribe(res => {
      this.bookedData = res.bookingData;
      console.log(this.bookedData, "booking");
    });
  }
}
    // this.bookedData = [
    //   { username: 'kathiravan', flightId: 'Tamu2023', seat: '2a' },
    //   { username: 'raj', flightId: 'Tamu2023', seat: '2d' },
    //   { username: 'keerthi', flightId: 'Tamu2023', seat: '31' },
    //   { username: 'tarun', flightId: 'Tamu2023', seat: '4d' },
    //   { username: 'sathish', flightId: 'Tamu2023', seat: '8f' },
    //   { username: 'munna', flightId: 'Tamu2023', seat: '1a' }
    // ];
    
  }

  generateSeats() {
    let rowNumber = 1;
    for (let i = 0; i < this.rows; i++) {
      let rowSeats: string[] = [];
      for (let j = 0; j < this.seatsPerRow; j++) {
        let seat = String.fromCharCode(97 + j); // Convert 0-based index to alphabets (a, b, c, ...)
        rowSeats.push(rowNumber + seat);
      }
      this.seats.push(rowSeats);
      rowNumber++;
    }
  }

  showConfirmation(seat: string): void {
    if (confirm("Do you want to book seat " + seat + "?")) {
      this.addBooking(seat);
    }
  }
  addBooking(seatNo: any): void {
    console.log("Seat ID: " + seatNo);
    this.aircraftObj.seatNo = seatNo;
    this.auth.PostBookingData(this.aircraftObj)
    .subscribe({
      next: (res => {
        console.log(res);
        alert('Flight Ticket Booked Successfully');
        this.router.navigate(['dashboard','MyBookingRecords'])
      })
    });
} 
   // Define a method to check if a seat is already booked
   isSeatBooked(seat: string): boolean {
    return this.bookedData.some((booking: any) => booking.seatNo === seat);
  }
  
 
}