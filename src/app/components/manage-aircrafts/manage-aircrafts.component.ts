import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-manage-aircrafts',
  templateUrl: './manage-aircrafts.component.html',
  styleUrls: ['./manage-aircrafts.component.css']
})
export class ManageAircraftsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  UserData: any;
  editForm!: FormGroup;
  userName: any;
  role: any;
  userame: any;
  AirCraftData:any;
  
  constructor(
    private router: Router,
    private userStore: UserStoreService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
    this.role=localStorage.getItem('role');
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'text tenant'
      }
    };

    this.editForm = this.fb.group({
      flightNumber: [''],
      from: [''],
      to: [''],
      arrivalTime: [''],
      departureTime: ['']
    });
    this.auth.GetFlightDetail().subscribe((res) => {
      this.AirCraftData = res;
      console.log(this.AirCraftData);
      this.dtTrigger.next(null);
    });
  }


  Reject(aircraft: any) {
    let clickedYes = confirm('Are you sure you want to delete');
    if (clickedYes) {
      this.auth.DeleteAircraftDetail(aircraft.aircraftCode).subscribe((res) => {
        alert('Deleted Successfully');
      });
    }
  }
  onAccept(aircraft: any) {
    this.editForm.patchValue({
      flightCode:aircraft.flightCode,
      from: aircraft.from,
      to: aircraft.to,
      arrivalTime: aircraft.arrivalTime,
      departureTime: aircraft.departureTime
    });
    let clickedYes = confirm('Are you sure want to edit?');
    if (clickedYes) {
      console.log(this.editForm.value);
      this.auth.UpdateFlightData(this.editForm.value)
        .subscribe({
          next: (res => {
            alert(res.message);
            this.router.navigate(['myJobData']);
          }),
          error: (err => {
            alert(err?.error.message);
          })
        });
    }
  }

  onFromEdit(event: any) {
    this.editForm.controls['from'].setValue(event.target.innerText);
  }

  onToEdit(event: any) {
    this.editForm.controls['to'].setValue(event.target.innerText);
  }

  onArrivalTimeEdit(event: any) {
    this.editForm.controls['arrivalTime'].setValue(event.target.innerText);
  }

  onDepartureTimeEdit(event: any) {
    this.editForm.controls['departureTime'].setValue(event.target.innerText);
  }
  startBooking(aircraftObj:any){
    console.log(aircraftObj,"vaama")
    aircraftObj.userName = this.userName;
    localStorage.setItem('AircraftObj', JSON.stringify(aircraftObj));
    this.auth.aircraftObj = aircraftObj;
    this.router.navigate(['dashboard', 'seatBooking']);
  }
  
 
}
