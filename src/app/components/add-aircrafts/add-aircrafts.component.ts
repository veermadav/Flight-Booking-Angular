import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-add-aircrafts',
  templateUrl: './add-aircrafts.component.html',
  styleUrls: ['./add-aircrafts.component.css']
})
export class AddAircraftsComponent implements OnInit{
  AirCraftDetailsForm!:FormGroup;
  tenantid:any;
 
  constructor(private route: ActivatedRoute, private fb:FormBuilder,private auth:AuthService,  private router:Router, private toast:NgToastService, private userStore : UserStoreService){}

  ngOnInit(): void {
    this.tenantid=localStorage.getItem('TenantId');
  
      this.AirCraftDetailsForm = this.fb.group({
        flightNumber:['',Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required],
        departureTime:['',Validators.required],
        arrivalTime:['',Validators.required],
        aircraftCode: [''] 
      });
  }
  
  async onSave() {
    if (this.AirCraftDetailsForm.valid) {
      try {
        // Generate a random string for aircraftCode
        const aircraftCode = await this.generateRandomString();

        // Update the aircraftCode field in the form
        this.AirCraftDetailsForm.patchValue({ aircraftCode: aircraftCode });

        console.log(this.AirCraftDetailsForm.value);

        // Send the data to the database
        await this.auth.PostAircraftDetail(this.AirCraftDetailsForm.value).toPromise();

        alert('Data saved successfully');
        this.AirCraftDetailsForm.reset();
        this.router.navigate(['dashboard']);
      } catch (error: any) {
        alert(error?.error?.message || 'An error occurred while saving the data');
      }
    } else {
      // Throw an error using toaster and with required details
      this.validateAllFormFields(this.AirCraftDetailsForm);
      alert('Your form is invalid');
    }
  }

  async generateRandomString() {
    return new Promise<string>((resolve) => {
      const length = 10;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      resolve(result);
    });
  }


  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
  changeInputType(input: HTMLInputElement) {
    input.type = 'datetime-local';
  }
  resetInputType(input: HTMLInputElement) {
    if (input.value === '') {
      input.type = 'text';
    }
  }
 
}


