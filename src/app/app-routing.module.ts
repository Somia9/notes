
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {path:"",redirectTo:'login' ,pathMatch:'full'},

  {path:"profile", component:ProfileComponent},
  {path:"login" ,component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
