import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

jwtDecode

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if (localStorage.getItem('userData')) {
      this.saveUserData()
    }
   };

  userData=new BehaviorSubject(null);

  saveUserData(){
    let encodeToken=localStorage.getItem('userData');
    let decodeToken:any =jwt_decode(encodeToken !);
    this.userData.next(decodeToken);
    // console.log(this.userData)


  }

  signup(formData:object):Observable<any>
  {
     return this._HttpClient.post(`https://sticky-note-fe.vercel.app/signup`,formData)
  }

  signin(formData:object):Observable<any>
  {
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signin',formData)
  }

  signOut(){
    localStorage.removeItem('userData'),
    this.userData.next(null);
    this._Router.navigate(['/login'])

  }


}
function jwtDecode() {
  throw new Error('Function not implemented.');
}

