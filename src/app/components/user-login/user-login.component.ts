import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  loginFormUser!:FormGroup
  userName:any;
  role:any;
  result:any
  constructor(private fb:FormBuilder,private auth:AuthService,  private router:Router, private toast:NgToastService, private userStore : UserStoreService)
  {
  }

  ngOnInit(): void {
    this.loginFormUser = this.fb.group({
      userName: ['', Validators.required],
      usrPassword: ['', Validators.required]
    });
   
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
 
  onLogin(){
    if(this.loginFormUser.valid){

    console.log(this.loginFormUser.value)
    localStorage.setItem('userName', this.loginFormUser.value.userName);
      //send the data to database    
      this.auth.Userlogin(this.loginFormUser.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.loginFormUser.reset();
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
    

      this.validateAllFormFields(this.loginFormUser);
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


}
