import { Component } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare let $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isLoading:boolean=false;
  errorMessage:string='';
  constructor(private _AuthService:AuthService ,private _Router:Router){};

  registerForm:FormGroup =new FormGroup({
    first_name:new FormControl(null ,[Validators.required,Validators.minLength(3) ,Validators.maxLength(8)]),
    last_name:new FormControl(null ,[Validators.required,Validators.minLength(3) ,Validators.maxLength(8)]),
    age:new FormControl(null ,[Validators.required,Validators.min(6) ,Validators.max(80)]),
    email:new FormControl(null ,[Validators.required,Validators.email]),
    password:new FormControl(null ,[Validators.required])


  });
  signUp(registerForm:FormGroup){
  this.isLoading =true;
    this._AuthService.signup(registerForm.value).subscribe({
      next:(response)=>{

        console.log(response)
        if(response.message === 'success'){
          this.isLoading=false;
          this._Router.navigate(['/login'])

        }
        else{
          this.isLoading=false;
          this.errorMessage=response.message;
        }
       }
    })



  }


  ngOnInit(): void {
    $('#signin').particleground({
      dotColor: '#d6c676',
      lineColor: '#d6c676'
    });



  }
}
