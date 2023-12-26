import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './app-auth.guard.service';
import { CreateEventsComponent } from './events/create/create.events.component';
import { UpdateEventsComponent } from './events/update/update.events.component';
import { ViewEventComponent } from './events/view/view.events.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "events/new", component: CreateEventsComponent, canActivate: [AuthGuardService] },
  { path: "events/edit/:id", component: UpdateEventsComponent, canActivate: [AuthGuardService] },
  { path: "events/view/:id", component: ViewEventComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
