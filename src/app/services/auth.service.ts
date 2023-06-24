import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators'
import { Location } from '@angular/common';
import { HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  aircraftObj:any;
  private baseUrl1:string = "http://localhost:5148/api/Booking/"
  private baseUrl2:string = "http://localhost:5148/api/Aircraft/"
  private baseUrl3:string = "http://localhost:5148/api/User/"
  private userPayload:any;
 
  constructor(private http: HttpClient, private router:Router,private location: Location) {
   
   }
signup(usrObj:any){
  return this.http.post<any>(`${this.baseUrl3}register`,usrObj)
}

Userlogin(loginObj:any){
  return this.http.post<any>(`${this.baseUrl3}Authenticate`,loginObj)
}


signOut(){
  localStorage.clear();
  window.location.reload();
  this.router.navigate(['dashboard','usrLogin'])
}
getMyBooking(userName:any){
  return this.http.get<any>(`${this.baseUrl1}get_Booking_by_UserName?userName=`+userName)
}

PostBookingData(bookingObj: any){
  return this.http.post<any>(`${this.baseUrl1}add_BookingData`,bookingObj)
}
PostAircraftDetail(aircraftdetailObj : any){
  return this.http.post<any>(`${this.baseUrl2}add_Aircraft`,aircraftdetailObj)
}

// DeleteMyBooking(bookingObj :any){
//   return this.http.delete<any>(`${this.baseUrl1}delete_MyBookingdata`,bookingObj)
// }
DeleteMyBooking(bookingObj: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' // Set the appropriate media type here
    }),
    body: bookingObj // Pass the bookingObj as the request body
  };

  return this.http.delete<any>(`${this.baseUrl1}delete_MyBookingdata`, httpOptions);
}
DeleteAircraftDetail(aircraftCode : string){
  return this.http.delete<any>(`${this.baseUrl2}delete_AirCraftdata/`+aircraftCode)
  .pipe(map((res:any)=>{
    return res;
  }))
}
getSeatDetails(aircraftCode:any){
  return this.http.get<any>(`${this.baseUrl1}get_booking_by_aircraftCode?aircraftCode=`+aircraftCode)
  .pipe(map((res:any)=>{
    return res;
  }))
}
GetAllBookings(){
  return this.http.get<any>(`${this.baseUrl1}get_all_Bookings`)
  .pipe(map((res:any)=>{
    return res;
  }))
}
GetAllUsers(){
  return this.http.get<any>(`${this.baseUrl3}`)
  .pipe(map((res:any)=>{
    return res;
  }))
}


GetFlightDetail(){
  return this.http.get<any>(`${this.baseUrl2}`)
  .pipe(map((res:any)=>{
    return res;
  }))
}
UpdateFlightData(data : any){
  return this.http.put<any>(`${this.baseUrl2}update_Aircraft`,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
}
