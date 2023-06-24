import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import {MatSidenavModule} from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { DataTablesModule } from 'angular-datatables';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SeatBookingComponent } from './components/seat-booking/seat-booking.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { AddAircraftsComponent } from './components/add-aircrafts/add-aircrafts.component';
import { ManageAircraftsComponent } from './components/manage-aircrafts/manage-aircrafts.component';
import { MyBookingRecordsComponent } from './components/my-booking-records/my-booking-records.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserLoginComponent,
    SeatBookingComponent,
    UserSignUpComponent,
    AddAircraftsComponent,
    ManageAircraftsComponent,
    MyBookingRecordsComponent,
    UserReservationsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    //ChartModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    DataTablesModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule
  
  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
