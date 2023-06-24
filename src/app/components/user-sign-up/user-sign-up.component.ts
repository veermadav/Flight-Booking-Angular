import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit{
  public tenants:any=[];
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public isValidEmail!:boolean;
  SignUpFormUser!:FormGroup;
  result:any;
  constructor(private route: ActivatedRoute, private fb:FormBuilder,private auth:AuthService,  private router:Router, private toast:NgToastService, private userStore : UserStoreService){}

  ngOnInit(): void {
      this.SignUpFormUser = this.fb.group({
        userName: ['', Validators.required],
        usrEmail: ['', Validators.required],
        usrPhoneNo: ['', Validators.required],
        usrPassword: ['', Validators.required]
      });

  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignUp(){
    if(this.SignUpFormUser.valid){
    console.log(this.SignUpFormUser.value)
    localStorage.setItem('userName', this.SignUpFormUser.value.userName);
      //send the data to database    
      this.auth.signup(this.SignUpFormUser.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.SignUpFormUser.reset();
          this.result = res.user;
          console.log(this.result);
          localStorage.setItem('userName', this.result.userName);
          localStorage.setItem('role', this.result.usrRole);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000})
          localStorage.setItem('status', "true");
          this.router.navigate(['dashboard']);

        }),
        error:(err)=>{
          this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration:5000});
          console.log(err);
        },
      })
    }else{
      //throw an error using toaster and with required details
      this.validateAllFormFields(this.SignUpFormUser);
      alert("your form is invalid");
    }
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
  
checkValidEmail(event:string){
  const value = event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail = pattern.test(value);
  return this.isValidEmail;
}
}

