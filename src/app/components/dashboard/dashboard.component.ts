import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public status: string | null = "";
  
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  AllocationData:any;
  usrId:any;
  constructor( private cdRef: ChangeDetectorRef, private router: Router,private route: ActivatedRoute,private auth:AuthService, private userStore:UserStoreService, private modalService:NgbModal){}
 
  @ViewChild('content') popupview !: ElementRef;
  pdfurl='';
  userName:any;
  role:any;
  showNewLabel: boolean = false;
  isOpen: boolean = false;
 
  ngOnInit(): void {
    this.cdRef.detectChanges();
    this.userName=localStorage.getItem('userName');
    this.role=localStorage.getItem('role');
    this.status=localStorage.getItem('status');
}

  logout(){
    this.auth.signOut();
  }
  signUp(){
    this.router.navigate(['SignUp'], { relativeTo: this.route });
  }
  Login(){
    this.router.navigate(['usrLogin'], { relativeTo: this.route });
  }
  addTicket(){
    this.router.navigate(['ManageAircrafts'], { relativeTo: this.route });
  }
  users_BookingData() {
    this.router.navigate(['UserReservations'], { relativeTo: this.route });
  }
  my_booking_Records(){
    this.router.navigate(['MyBookingRecords'], { relativeTo: this.route });
  }
  addAircraftdetail(){
    this.router.navigate(['addAirCrafts'], { relativeTo: this.route });
  }
  manageAircrafts(){
    this.router.navigate(['ManageAircrafts'], { relativeTo: this.route });
  }
  
}


