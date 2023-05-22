import { Component } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private _AuthService:AuthService){};

  logout(){
    this._AuthService.signOut()
  }

}
