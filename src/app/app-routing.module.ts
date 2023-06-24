import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SeatBookingComponent } from './components/seat-booking/seat-booking.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { AddAircraftsComponent } from './components/add-aircrafts/add-aircrafts.component';
import { ManageAircraftsComponent } from './components/manage-aircrafts/manage-aircrafts.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { MyBookingRecordsComponent } from './components/my-booking-records/my-booking-records.component';
const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path:'usrLogin',component:UserLoginComponent
      },
      {
        path: 'SignUp',
        component: UserSignUpComponent,
      },
     
      {
        path: 'ManageAircrafts',
        component: ManageAircraftsComponent,
      },
      {
        path:'seatBooking',component:SeatBookingComponent
      },
      {
        path:'addAirCrafts',component:AddAircraftsComponent
      },
      {
        path:'UserReservations', component:UserReservationsComponent
      },
      {
        path:'MyBookingRecords', component:MyBookingRecordsComponent
      }
      
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
