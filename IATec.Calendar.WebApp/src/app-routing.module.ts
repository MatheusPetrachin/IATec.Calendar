import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { LoginComponent } from './app/Pages/login/login.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login", component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class AppRoutingModule { }
