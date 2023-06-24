import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  public myBookings:any=[];
  dtTrigger:Subject<any>=new Subject<any>();
  userName:any;
  role:any;

  constructor(private router: Router,private userStore : UserStoreService,private auth:AuthService) {}

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching:true,
      lengthChange:false,
      language:{
        searchPlaceholder:'text tenant'
      }
    };
  
    this.auth.GetAllBookings().subscribe(res => {
      this.myBookings = res.bookingData;
      console.log(this.myBookings, "Tenant");
      this.dtTrigger.next(null);
      // this.rerender();
    });
  }
  Reject(mybooking:any){
    let clickedYes = confirm("Are you sure want to cancel");
    if(clickedYes){
     this.auth.DeleteMyBooking(mybooking)
     .subscribe(res=>{
       alert("Your Ticket Cancelled Successfully");
       window.location.reload();
      //  this.router.navigate(['dashboard','UserReservations'])
     })
    }
  }
 
}
