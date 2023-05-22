import { Component } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare let $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  isLoading:boolean=false;
  errorMessage:string='';
  constructor(private _AuthService:AuthService ,private _Router:Router){};

  loginForm:FormGroup =new FormGroup({


    email:new FormControl(null ,[Validators.required,Validators.email]),
    password:new FormControl(null ,[Validators.required])


  });
  signUp(loginForm:FormGroup){
  this.isLoading =true;
    this._AuthService.signin(loginForm.value).subscribe({
      next:(response)=>{

        console.log(response)
        if(response.message === 'success'){
          this.isLoading=false;
          localStorage.setItem('userData' ,JSON.stringify(response.token));
          // console.log(response.token)

          this._Router.navigate(['/profile'])

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
